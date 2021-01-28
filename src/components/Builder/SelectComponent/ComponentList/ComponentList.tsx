import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { getComponentsUrl, ITEMS_PER_PAGE } from '../../../../constants'
import { useIsMounted } from '../../../../hooks/useIsMounted'
import { Error } from '../../../../types/Error'
import { Product } from '../../../../types/Product'
import { ProductList } from '../../../Products/ProductList'
import styles from './ComponentList.module.scss'

interface Props {
    type: string
}

export const ComponentList: FunctionComponent<Props> = props => {
    const { type } = props

    const [products, setProducts] = useState<Product[] | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [filters, setFilters] = useState({})

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const fetchData = useCallback(async () => {
        setError(null)
        setLoading(true)

        const response = await fetch(getComponentsUrl(type), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: 1,
                count: ITEMS_PER_PAGE,
                filters
            })
        })

        const data = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setError(data)
            setProducts(null)
            setLoading(false)
            return
        }

        setProducts(data.products)
        setLoading(false)
    }, [type, filters, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={styles.root}>
            {products && !loading && <ProductList products={products} />}
        </div>
    )
}
