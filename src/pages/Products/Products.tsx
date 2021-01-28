import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Pagination } from '../../components/Products/Pagination'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { getComponentsUrl, ITEMS_PER_PAGE } from '../../constants'
import { useIsMounted } from '../../hooks/useIsMounted'
import { Error } from '../../types/Error'
import { ProductsPage } from '../../types/params/ProductsPage'
import { Product } from '../../types/Product'
import { ProductArrayResponse } from '../../types/ProductArrayResponse'
import styles from './Products.module.scss'

export const Products: FunctionComponent = () => {
    const { search } = useLocation<Location>()

    const { type } = useParams<ProductsPage>()

    const [products, setProducts] = useState<Product[] | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [filters, setFilters] = useState({})

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const page: number = useMemo(() => {
        return Number(new URLSearchParams(search).get('page')) || 1
    }, [search])

    const fetchData = useCallback(async () => {
        setError(null)
        setLoading(true)

        const response = await fetch(getComponentsUrl(type), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: page,
                count: ITEMS_PER_PAGE,
                filters
            })
        })

        const data = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setError(data)
            setProducts(null)
            setTotal(null)
            setLoading(false)
            return
        }

        setProducts(data.products)
        setTotal(data.total)
        setLoading(false)
    }, [type, filters, page, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={styles.root}>
            <ProductFilters type={type} filters={filters} onChange={setFilters} />
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {products && !loading && <ProductList products={products} />}
            {total && <Pagination count={total} />}
        </div>
    )
}
