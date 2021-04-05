import React, { FunctionComponent, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Pagination } from '../../components/Products/Pagination'
import { ProductFilters } from '../../components/Products/ProductFilters'
import { ProductList } from '../../components/Products/ProductList'
import { Header } from '../../components/UI/Header'
import { ITEMS_PER_PAGE } from '../../constants'
import { useFetchSearchResult } from '../../hooks/HTTP/useFetchSearchResult'
import styles from './SearchResult.module.scss'

export const SearchResult: FunctionComponent = () => {
    const { search } = useLocation<Location>()

    const searchParams: URLSearchParams = useMemo(() => {
        const params = new URLSearchParams(search)

        if (!params.has('page')) {
            params.set('page', '1')
        }

        if (!params.has('count')) {
            params.set('count', String(ITEMS_PER_PAGE))
        }
        return params
    }, [search])

    const { error, loading, products, total } = useFetchSearchResult(searchParams.toString())

    return (
        <div className={styles.root}>
            <Header count={total ?? 0}>{searchParams.get('search')}</Header>
            <div>
                {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
                {products && !loading && <ProductList products={products} />}
                {total && <Pagination count={total} />}
            </div>
        </div>
    )
}
