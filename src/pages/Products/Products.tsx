import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Pagination } from '../../components/Products/Pagination'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { Loader } from '../../components/UI/Loader'
import { getComponentsUrl, ITEMS_PER_PAGE } from '../../constants'
import { useIsMounted } from '../../hooks/useIsMounted'
import { Error } from '../../types/Error'
import { ProductsPage } from '../../types/params/ProductsPage'
import { ProductArrayResponse } from '../../types/ProductArrayResponse'
import styles from './Products.module.scss'

export const Products: React.FC = () => {
    const { search } = useLocation<Location>()

    const { type } = useParams<ProductsPage>()

    const [data, setData] = useState<ProductArrayResponse | null>(null)
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

        const resData = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setError(resData)
            setData(null)
            setLoading(false)
            return
        }

        setData(resData)
        setLoading(false)
    }, [type, filters, page, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={styles.root}>
            <ProductFilters type={type} filters={filters} onChange={setFilters} />
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && !loading && <ProductList products={data.products} />}
            {data && <Pagination count={data.total} />}
        </div>
    )
}
