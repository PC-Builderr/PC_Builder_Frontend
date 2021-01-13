import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Pagination } from '../../../components/Products/Pagination'
import { ProductFilters } from '../../../components/Products/ProductFilters'
import { ProductList } from '../../../components/Products/ProductList'
import { ITEMS_PER_PAGE } from '../../../constants'
import { useFetch } from '../../../hooks/useFetch'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import styles from './index.module.scss'

interface Props {}

export const CPUProductsPage: React.FC<Props> = props => {
    const {
        fetchData,
        state: { data, error, loading }
    } = useFetch<ProductArrayResponse>()

    const [filters, setFilters] = useState({})

    const { search } = useLocation<Location>()
    const page: number = useMemo(() => {
        return Number(new URLSearchParams(search).get('page')) || 1
    }, [search])

    useEffect(() => {
        console.log('fetch')
        fetchData(`${process.env.REACT_APP_API_URL}/cpu`, {
            method: 'POST',
            body: JSON.stringify({
                page: page,
                count: ITEMS_PER_PAGE,
                filters
            })
        })
    }, [fetchData, page, filters])

    return (
        <div className={styles.root}>
            {loading && '...Loading'}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && (
                <>
                    <ProductFilters type='cpu' filters={filters} onChange={setFilters} />
                    <ProductList products={data.products} />
                    <Pagination count={data.total / ITEMS_PER_PAGE}></Pagination>
                </>
            )}
        </div>
    )
}
