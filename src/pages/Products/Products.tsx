import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Pagination } from '../../components/Products/Pagination'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { getComponentsUrl, ITEMS_PER_PAGE } from '../../constants'
import { Error } from '../../types/Error'
import { ProductsPage } from '../../types/params/ProductsPage'
import { ProductArrayResponse } from '../../types/ProductArrayResponse'
import styles from './Products.module.scss'

interface Props {}

export const Products: React.FC<Props> = props => {
    const { search } = useLocation<Location>()

    const { type } = useParams<ProductsPage>()

    const [data, setData] = useState<ProductArrayResponse | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [filters, setFilters] = useState({})

    const page: number = useMemo(() => {
        return Number(new URLSearchParams(search).get('page')) || 1
    }, [search])

    const fetchData = useCallback(async () => {
        setData(null)
        setError(null)

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

        if (!response.ok) {
            setError(resData)
            return
        }

        setData(resData)
    }, [type, filters, page])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={styles.root}>
            <ProductFilters type={type} filters={filters} onChange={setFilters} />
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && (
                <>
                    <ProductList products={data.products} />
                    <Pagination count={data.total / ITEMS_PER_PAGE}></Pagination>
                </>
            )}
        </div>
    )
}
