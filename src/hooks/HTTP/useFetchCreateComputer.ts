import { useCallback, useContext, useEffect, useState } from 'react'
import { COMPUTER_API_URL } from '../../constants'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { Error } from '../../types/Error'
import { Computer } from '../useBuilder/computer/Computer'
import { useCart } from '../useCart'
import { useIsMounted } from '../useIsMounted'

interface State {
    error: Error | null
    loading: boolean
    data: any
    disabled: boolean
}

interface Methods {
    createComputer: () => Promise<void>
}

interface CreateComputer {
    state: State
    methods: Methods
}

export const useFetchCreateComputer = (computer: Computer): CreateComputer => {
    const [data, setData] = useState<any>()
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    const { authState } = useContext<AuthContextInterface>(AuthContext)
    const {
        methods: { addItem }
    } = useCart()

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const createComputer = useCallback(async () => {
        setError(null)
        setLoading(true)

        const response = await fetch(COMPUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authState?.token}`
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

        setLoading(false)
        setData(data)
        addItem({ id: data.computer.product.id, quantity: 1 })
    }, [isMounted, computer, authState, addItem])

    useEffect(() => {
        if (validateComputer(computer) && !loading) {
            setDisabled(false)
            return
        }
        setDisabled(true)
    }, [computer, loading])

    return {
        methods: {
            createComputer
        },
        state: { error, loading, data, disabled }
    }
}

const validateComputer = (computer: Computer): boolean => {
    if (Object.values(computer).includes(null)) {
        return false
    }

    if (!computer.name) {
        return false
    }

    if (computer.storages.includes(null)) {
        return false
    }

    return true
}
