import { useCallback, useState } from 'react'
import { RequestOptions } from './RequestOptions'
import { useIsMounted } from '../useIsMounted/useIsMounted'
import { Error } from '../../types/Error'

interface FetchState<T> {
    data: T | null
    loading: boolean
    error: Error | null
}

const defaultOptions = { method: 'GET', headers: null, body: null }

export const useFetch = <T>(): {
    state: FetchState<T>
    fetchData: (url: string, options?: RequestOptions) => void
} => {
    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const [state, setState] = useState<FetchState<T>>({ data: null, loading: false, error: null })

    const fetchData = useCallback(
        async (url: string, options: RequestOptions = defaultOptions): Promise<void> => {
            setState({ data: null, loading: true, error: null })
            const response = await fetch(url, {
                method: options.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body
            })
            const resData: any = await response.json()

            if (!isMounted.current) return
            if (!response.ok) {
                setState({ data: null, loading: false, error: resData })
                return
            }

            setState({ data: resData, loading: false, error: null })
        },
        [isMounted]
    )
    return { state, fetchData }
}
