import decode from 'jwt-decode'
import { useCallback, useContext, useEffect } from 'react'
import { ONE_SECOND_IN_MS, REFRESH_TOKEN_API_URL } from '../../constants'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { DecodedToken } from '../../types/token/DecodedToken'
import { TokenResponse } from '../../types/token/TokenResponse'

export const useRefreshToken = () => {
    const { setAuthState, authState } = useContext<AuthContextInterface>(AuthContext)

    const fetchData = useCallback(async () => {
        const response = await fetch(REFRESH_TOKEN_API_URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) return

        const data: TokenResponse = await response.json()
        const { exp, id }: DecodedToken = decode(data.token)

        setAuthState({
            exp: exp * ONE_SECOND_IN_MS,
            token: data.token,
            userId: id
        })
    }, [setAuthState])

    useEffect(() => {
        if (!authState) {
            fetchData()
            return
        }

        const timer: NodeJS.Timeout = setTimeout(() => {
            fetchData()
        }, authState.exp)

        return () => clearTimeout(timer)
    }, [authState, fetchData])
}
