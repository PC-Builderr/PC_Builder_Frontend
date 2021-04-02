import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination } from '../../components/Products/Pagination'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { Header } from '../../components/UI/Header'
import { ComponentNames } from '../../constants'
import { useFetchFilteredProducts } from '../../hooks/HTTP/useFetchFilteredProducts'
import { ProductsPage } from '../../types/params/ProductsPage'
import styles from './Products.module.scss'

export const Products: FunctionComponent = () => {
    const { type } = useParams<ProductsPage>()

    const {
        methods: { setFilters },
        state: { error, filters, loading, products, total }
    } = useFetchFilteredProducts(type)

    return (
        <div className={styles.root}>
            <Header>
                {ComponentNames.get(type)} <span>({total})</span>
            </Header>
            <ProductFilters type={type} filters={filters} onChange={setFilters} />
            <div>
                {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
                {products && !loading && <ProductList products={products} />}
                {total && <Pagination count={total} />}
            </div>
        </div>
    )
}
