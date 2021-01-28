import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { IoSearchSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { useFetchSearchResult } from '../../../hooks/HTTP/useFetchSearchResult'
import { useClickAway } from '../../../hooks/useClickAway'
import { Product } from '../../../types/Product'
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

    const { isOpen, close, open } = useClickAway()

    const { error, loading, products, total } = useFetchSearchResult(params.toString(), {
        clearDataOnFetchStart: true
    })

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
        close()

        const timeout: NodeJS.Timeout = setTimeout(() => {
            if (!search) return

            params.set('search', search)
            open()
        }, 1000)

        return () => clearTimeout(timeout)
    }, [search, open, close])

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
