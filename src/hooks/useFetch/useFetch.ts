import { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { Error } from '../../types/Error'
import { useIsMounted } from '../useIsMounted/useIsMounted'
import { RequestOptions } from './RequestOptions'

interface FetchState<T> {
    data: T | null
    loading: boolean
    error: Error | null
}

const defaultOptions = { method: 'GET' }

export const useFetch = <T>(): {
    state: FetchState<T>
    fetchData: (url: string, options?: RequestOptions) => void
} => {
    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const [state, setState] = useState<FetchState<T>>({ data: null, loading: false, error: null })

    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const fetchData = useCallback(
        async (url: string, options: RequestOptions = defaultOptions): Promise<void> => {
            setState({ data: null, loading: true, error: null })

            let headers: Headers | string[][] | Record<string, string> = {
                'Content-Type': 'application/json',
                ...options.headers
            }

            if (authState?.token) {
                headers = { ...headers, Authorization: `Bearer ${authState?.token}` }
            }

            const response = await fetch(url, {
                method: options.method,
                credentials: 'include',
                headers,
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
        [isMounted, authState?.token]
    )
    return { state, fetchData }
}
