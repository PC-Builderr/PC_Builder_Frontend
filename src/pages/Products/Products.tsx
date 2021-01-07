import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { useFetch } from '../../hooks/useFetch'
import { ProductArrayResponse } from '../../interfaces/ProductArrayResponse'
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

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/${type}`)
    }, [fetchData, type])

    return (
        <div className={styles.root}>
            <ProductFilters />
            {loading ? '...Loading' : null}
            {error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null}
            {data ? <ProductList products={data.products} /> : null}
        </div>
    )
}
