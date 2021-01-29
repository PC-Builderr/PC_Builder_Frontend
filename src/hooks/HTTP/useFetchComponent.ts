import { useCallback, useEffect, useState } from 'react'
import { GET_FULL_COMPONENT_URL } from '../../constants'
import { Component } from '../../types/components/Component'
import { useIsMounted } from '../useIsMounted'

interface State {
    component: Component | null
    error: Error | null
}

export const useFetchComponent = (type: string, id: string): State => {
    const [component, setComponent] = useState<Component | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const fetchData = useCallback(async () => {
        setError(null)

        const response = await fetch(GET_FULL_COMPONENT_URL(type, id))

        const resData = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setComponent(null)
            setError(resData)
            return
        }

        setComponent(resData.component)
    }, [type, id, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return {
        component,
        error
    }
}
