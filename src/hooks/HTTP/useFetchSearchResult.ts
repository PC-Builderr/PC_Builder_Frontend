import { useCallback, useEffect, useState } from 'react'
import { PRODUCTS_API_URL } from '../../constants'
import { Product } from '../../types/product/Product'
import { useIsMounted } from '../useIsMounted'

interface State {
    products: Product[] | null
    total: number | null
    error: Error | null
    loading: boolean
}

interface Options {
    clearDataOnFetchStart?: boolean
}

const defaultOptions: Options = { clearDataOnFetchStart: false }

export const useFetchSearchResult = (
    searchParams: string,
    options: Options = defaultOptions
): State => {
    const [products, setProducts] = useState<Product[] | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const fetchData = useCallback(async () => {
        setError(null)
        setLoading(true)
        if (options.clearDataOnFetchStart) {
            setProducts(null)
            setTotal(null)
        }

        const response = await fetch(`${PRODUCTS_API_URL}?${searchParams}`)

        const data = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setError(data)
            setLoading(false)
            if (options.clearDataOnFetchStart) return

            setProducts(null)
            setTotal(null)
            return
        }

        setProducts(data.products)
        setTotal(data.total)
        setLoading(false)
    }, [isMounted, searchParams, options.clearDataOnFetchStart])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return {
        products,
        total,
        error,
        loading
    }
}
