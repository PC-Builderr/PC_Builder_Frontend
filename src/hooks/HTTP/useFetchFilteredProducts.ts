import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GET_COMPONENTS_URL, ITEMS_PER_PAGE } from '../../constants'
import { Product } from '../../types/product/Product'
import { useIsMounted } from '../useIsMounted'

interface State {
    products: Product[] | null
    total: number | null
    error: Error | null
    loading: boolean
    filters: any
}
interface Methods {
    setFilters: React.Dispatch<React.SetStateAction<{}>>
}

export const useFetchFilteredProducts = (type: string): { state: State; methods: Methods } => {
    const { search } = useLocation<Location>()

    const [products, setProducts] = useState<Product[] | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [filters, setFilters] = useState({})

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const page: number = useMemo(() => {
        return Number(new URLSearchParams(search).get('page')) || 1
    }, [search])

    const fetchData = useCallback(async () => {
        setError(null)
        setLoading(true)

        const response = await fetch(GET_COMPONENTS_URL(type), {
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

        const data = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setError(data)
            setProducts(null)
            setTotal(null)
            setLoading(false)
            return
        }

        setProducts(data.products)
        setTotal(data.total)
        setLoading(false)
    }, [type, filters, page, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return {
        methods: {
            setFilters
        },
        state: { error, filters, loading, products, total }
    }
}
