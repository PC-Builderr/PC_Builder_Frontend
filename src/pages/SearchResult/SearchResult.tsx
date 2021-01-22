import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Pagination } from '../../components/Products/Pagination'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { Loader } from '../../components/UI/Loader'
import { ITEMS_PER_PAGE, PRODUCTS_API_URL } from '../../constants'
import { useIsMounted } from '../../hooks/useIsMounted'
import { ProductArrayResponse } from '../../types/ProductArrayResponse'
import styles from '../Products/Products.module.scss'

export const SearchResult: React.FC = () => {
    const { search } = useLocation<Location>()

    const [data, setData] = useState<ProductArrayResponse | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [filters, setFilters] = useState({})

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const params: string = useMemo(() => {
        const params = new URLSearchParams(search)

        if (!params.has('page')) {
            params.set('page', '1')
        }

        if (!params.has('count')) {
            params.set('count', String(ITEMS_PER_PAGE))
        }
        return params.toString()
    }, [search])

    const fetchData = useCallback(async () => {
        setError(null)
        setLoading(true)

        const response = await fetch(`${PRODUCTS_API_URL}?${params}`)

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
    }, [isMounted, params])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={styles.root}>
            <ProductFilters type={''} filters={filters} onChange={setFilters} />
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && !loading && <ProductList products={data.products} />}
            {data && <Pagination count={data.total} />}
        </div>
    )
}
