import { useCallback, useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { AuthContextState } from '../../context/Auth/AuthContextState'
import { useFetch } from '../useFetch'

interface LogoutState {
    logout: () => void
    authState: AuthContextState | null
}

export const useLogout = (): LogoutState => {
    const { setAuthState, authState } = useContext<AuthContextInterface>(AuthContext)

    const { fetchData } = useFetch()

    const logout = useCallback(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/auth/logout`, {
            method: 'POST'
        })
        setAuthState(null)
    }, [fetchData, setAuthState])

    return { logout, authState }
}
