import React, { useCallback, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { IoSearchSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { PRODUCTS_API_URL } from '../../../constants'
import { useClickAway } from '../../../hooks/useClickAway'
import { Product } from '../../../types/Product'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import { MobileProductCard } from '../../Products/ProductCard/MobileProductCart'
import { NotFound } from './NotFound'
import styles from './SearchInput.module.scss'

const params: URLSearchParams = new URLSearchParams([
    ['count', '3'],
    ['page', '1']
])

export const SearchInput: React.FC = () => {
    const location = useLocation()

    const [search, setSearch] = useState<string>('')
    const [data, setData] = useState<ProductArrayResponse | null>(null)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { isOpen, close, open } = useClickAway()

    const fetchData = useCallback(async () => {
        setData(null)
        setError(false)
        setLoading(true)

        const response = await fetch(`${PRODUCTS_API_URL}?${params.toString()}`)

        const resData = await response.json()

        if (!response.ok) {
            setError(true)
            setLoading(false)
            return
        }

        setData(resData)
        setLoading(false)
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
            {loading && <BiLoaderAlt className={styles.spinner} />}
            {isOpen && (
                <ul onClick={close}>
                    {data && (
                        <>
                            {data.products.map((product: Product) => (
                                <li key={product.id}>
                                    <MobileProductCard product={product} />
                                </li>
                            ))}
                            <li className={styles.allProducts}>
                                <Link to={`/products?search=${search}`}>
                                    See all {data.total} results.
                                </Link>
                            </li>
                        </>
                    )}
                    {error && <NotFound />}
                </ul>
            )}
        </div>
    )
}
