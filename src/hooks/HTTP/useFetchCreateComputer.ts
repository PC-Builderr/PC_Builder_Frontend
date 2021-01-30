import { useCallback, useEffect, useState } from 'react'
import { COMPUTER_API_URL } from '../../constants'
import { Error } from '../../types/Error'
import { Computer } from '../useBuilder/computer/Computer'
import { useIsMounted } from '../useIsMounted'

interface State {
    error: Error | null
    loading: boolean
    data: any
    disabled: boolean
}

interface Methods {
    createComputer: () => void
}

interface CreateComputer {
    state: State
    methods: Methods
}

export const useFetchCreateComputer = (computer: Computer | null): CreateComputer => {
    const [data, setData] = useState<any>()
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const createComputer = useCallback(async () => {
        setError(null)
        setLoading(true)

        const response = await fetch(COMPUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(computer)
        })

        const data = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setError(data)
            setData(null)
            setLoading(false)
            return
        }

        setData(data)
        setLoading(false)
    }, [isMounted, computer])

    useEffect(() => {
        if (validateComputer(computer)) {
            setDisabled(false)
            return
        }
        setDisabled(true)
    }, [computer])

    return {
        methods: {
            createComputer
        },
        state: { error, loading, data, disabled }
    }
}

const validateComputer = (computer: Computer | null): boolean => {
    if (!computer) {
        return false
    }

    if (Object.values(computer).includes(null)) {
        return false
    }

    if (computer.storageIds.includes(null)) {
        return false
    }

    return true
}
