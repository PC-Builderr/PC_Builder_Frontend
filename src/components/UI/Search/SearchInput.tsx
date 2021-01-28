import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { IoSearchSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { PRODUCTS_API_URL } from '../../../constants'
import { useClickAway } from '../../../hooks/useClickAway'
import { Product } from '../../../types/Product'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import { MobileProductCard } from '../../Products/ProductCard/MobileProductCard'
import { NotFound } from './NotFound'
import styles from './SearchInput.module.scss'

const params: URLSearchParams = new URLSearchParams([
    ['count', '3'],
    ['page', '1']
])

export const SearchInput: FunctionComponent = () => {
    const location = useLocation()

    const [search, setSearch] = useState<string>('')
    const [products, setProducts] = useState<Product[] | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { isOpen, close, open } = useClickAway()

    const fetchData = useCallback(async () => {
        setTotal(null)
        setProducts(null)
        setError(false)
        setLoading(true)

        const response = await fetch(`${PRODUCTS_API_URL}?${params.toString()}`)

        const data: ProductArrayResponse = await response.json()

        if (!response.ok) {
            setError(true)
            setLoading(false)
            return
        }

        setTotal(data.total)
        setProducts(data.products)
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
                    {products?.map((product: Product) => (
                        <li key={product.id}>
                            <MobileProductCard product={product} />
                        </li>
                    ))}
                    {total && (
                        <li className={styles.allProducts}>
                            <Link to={`/products?search=${search}`}>See all {total} results.</Link>
                        </li>
                    )}
                    {error && <NotFound />}
                </ul>
            )}
        </div>
    )
}
