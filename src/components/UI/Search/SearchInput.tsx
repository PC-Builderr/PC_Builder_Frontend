import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { BiLoaderAlt } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { useClickAway } from '../../../hooks/useClickAway'
import { useFetch } from '../../../hooks/useFetch'
import { Product } from '../../../types/Product'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import { NotFound } from './NotFound'
import styles from './SearchInput.module.scss'
import { SearchResult } from './SearchResult'

interface Props {}

export const SearchInput: React.FC<Props> = props => {
    const [search, setSearch] = useState<string>('')
    const { isOpen, close, open } = useClickAway()
    const location = useLocation()
    const {
        state: { data, error, loading },
        fetchData
    } = useFetch<ProductArrayResponse>()

    const searchProductsHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value)
        },
        [setSearch]
    )
    const inputClickHandler = useCallback(
        (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            if (search) open(event)
        },
        [open, search]
    )
    const urlSearchParams: URLSearchParams = useMemo(() => {
        return new URLSearchParams([
            ['count', '3'],
            ['page', '1']
        ])
    }, [])

    useEffect(() => {
        setSearch('')
    }, [location])

    useEffect(() => {
        const timeout: NodeJS.Timeout = setTimeout(() => {
            if (search) {
                urlSearchParams.set('search', search)
                fetchData(`${process.env.REACT_APP_API_URL}/product?${urlSearchParams.toString()}`)
                open()
            }
        }, 1000)
        if (!search) close()

        return () => clearTimeout(timeout)
    }, [search, fetchData, open, urlSearchParams, close])

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
            {loading && <BiLoaderAlt className={styles.spinner} />}
            {isOpen && (
                <ul onClick={close}>
                    {data?.products.map((product: Product) => {
                        return <SearchResult key={product.id} product={product} />
                    })}
                    {error ? (
                        <NotFound />
                    ) : (
                        <li className={styles.allProducts}>
                            <Link to={`/products?search=${search}`}>
                                See all {data?.total} results.
                            </Link>
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}
