import { useCallback, useEffect, useRef, useState } from 'react'
import { FetchState } from './FetchState'
import { RequestOptions } from './RequestOptions'

const defaultOptions = { method: 'GET', headers: null, body: null }

export const useFetch = <T>(): {
    state: FetchState<T>
    fetchData: (url: string, options?: RequestOptions) => void
} => {
    let isVisible = useRef<boolean>(true)
    useEffect((): (() => void) => {
        return () => (isVisible.current = false)
    }, [])

    const [state, setState] = useState<FetchState<T>>({ data: null, loading: false, error: null })

    const fetchData = useCallback(
        async (url: string, options: RequestOptions = defaultOptions): Promise<void> => {
            setState({ data: null, loading: true, error: null })
            const response = await fetch(url, {
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body
            })
            const resData: any = await response.json()

            if (!isVisible.current) return
            if (!response.ok) {
                setState({ data: null, loading: false, error: resData })
                return
            }

            setState({ data: resData, loading: false, error: null })
        },
        []
    )
    return { state, fetchData }
}
