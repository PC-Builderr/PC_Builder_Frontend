import React, { useCallback, useEffect, useState } from 'react'
import { getComponentsUrl, ITEMS_PER_PAGE } from '../../../../constants'
import { useIsMounted } from '../../../../hooks/useIsMounted'
import { ProductArrayResponse } from '../../../../types/ProductArrayResponse'
import { ProductList } from '../../../Products/ProductList'
import styles from './ComponentList.module.scss'

interface Props {
    type: string
}

export const ComponentList: React.FC<Props> = props => {
    const { type } = props

    const [data, setData] = useState<ProductArrayResponse | null>(null)
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
    }, [type, filters, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={styles.root}>
            {data && !loading && <ProductList products={data.products} />}
        </div>
    )
}
