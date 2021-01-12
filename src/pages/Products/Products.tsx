import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Pagination } from '../../components/Products/Pagination'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { useFetch } from '../../hooks/useFetch'
import { ProductArrayResponse } from '../../types/ProductArrayResponse'
import styles from './Products.module.scss'

interface Props {}

interface Params {
    type: string
}

export const Products: React.FC<Props> = props => {
    const { type } = useParams<Params>()
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
        fetchData(`${process.env.REACT_APP_API_URL}/${type}`, {
            method: 'POST',
            body: JSON.stringify({
                page: page,
                count: 4,
                filters
            })
        })
    }, [fetchData, type, page, filters])

    return (
        <div className={styles.root}>
            <ProductFilters type={type} filters={filters} onChange={setFilters} />
            {loading && '...Loading'}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && (
                <>
                    <ProductList products={data.products} />
                    <Pagination count={data.total / 4}></Pagination>
                </>
            )}
        </div>
    )
}
