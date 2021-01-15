import React, { useCallback, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { IoSearchSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { PRODUCTS_API_URL } from '../../../constants'
import { useClickAway } from '../../../hooks/useClickAway'
import { Error } from '../../../types/Error'
import { FetchState } from '../../../types/fetch/FetchState'
import { Product } from '../../../types/Product'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import { NotFound } from './NotFound'
import styles from './SearchInput.module.scss'
import { SearchResult } from './SearchResult'

interface Props {}

const params: URLSearchParams = new URLSearchParams([
    ['count', '3'],
    ['page', '1']
])

export const SearchInput: React.FC<Props> = props => {
    const location = useLocation()

    const [search, setSearch] = useState<string>('')
    const [data, setData] = useState<ProductArrayResponse | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const { isOpen, close, open } = useClickAway()

    const fetchData = useCallback(async () => {
        setData(null)
        setError(null)

        const response = await fetch(`${PRODUCTS_API_URL}?${params.toString()}`)

        const resData = await response.json()

        if (!response.ok) {
            setError(resData)
            return
        }

        setData(resData)
    }, [])

    const searchProductsHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }, [])

    const inputClickHandler = useCallback(
        (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            if (search) open(event)
        },
        [open, search]
    )

    useEffect(() => {
        const timeout: NodeJS.Timeout = setTimeout(() => {
            if (!search) return

            params.set('search', search)
            fetchData()
            open()
        }, 1000)
        if (!search) close()

        return () => clearTimeout(timeout)
    }, [search, open, close, fetchData])

    useEffect(() => {
        setSearch('')
    }, [location])

    return (
        <div className={styles.root}>
            <IoSearchSharp />
            <input
                type='text'
                placeholder='Search...'
                value={search}
                onChange={searchProductsHandler}
                onClick={inputClickHandler}
            />
            {!data && !error && <BiLoaderAlt className={styles.spinner} />}
            {isOpen && (
                <ul onClick={close}>
                    {data?.products.map((product: Product) => {
                        return <SearchResult key={product.id} product={product} />
                    })}
                    {data && (
                        <li className={styles.allProducts}>
                            <Link to={`/products?search=${search}`}>
                                See all {data?.total} results.
                            </Link>
                        </li>
                    )}
                    {error && <NotFound />}
                </ul>
            )}
        </div>
    )
}
