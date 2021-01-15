import { useCallback, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { DecodedToken } from '../../types/token/DecodedToken'
import decode from 'jwt-decode'
import { useFetch } from '../useFetch'
import { ONE_SECOND_IN_MS } from '../../constants'
import { TokenResponse } from '../../types/token/TokenResponse'
import { AuthContextState } from '../../context/Auth/AuthContextState'

interface RefreshTokenState {
    authState: AuthContextState | null
    getNewAccessToken: () => void
}

export const useRefreshToken = (): RefreshTokenState => {
    const { authState, setAuthState } = useContext<AuthContextInterface>(AuthContext)

    const {
        fetchData,
        state: { data }
    } = useFetch<TokenResponse>()

    const getNewAccessToken = useCallback(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
            method: 'POST',
            body: ''
        })
    }, [fetchData])

    useEffect(() => {
        if (!data?.token) {
            return
        }

        const { exp, id }: DecodedToken = decode(data.token)

        setAuthState({
            exp: exp * ONE_SECOND_IN_MS,
            token: data.token,
            userId: id
        })
    }, [data, setAuthState])

    useEffect(() => {
        console.log(authState)
        if (!authState) {
            return
        }

        const expirationTime: number = authState.exp - Date.now()
        const interval: NodeJS.Timeout = setInterval(() => {
            getNewAccessToken()
        }, expirationTime)

        return () => clearInterval(interval)
    }, [authState, getNewAccessToken])

    return { authState, getNewAccessToken }
}
