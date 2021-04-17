import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { USER_DATA_URL } from '../../constants'
import { UserDataResponse } from '../../types/user/UserDataResponse'
import { User } from '../../types/user/User'

interface UseUser {
    user: User | null
}

export const useUser = () => {
    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const [user, setUser] = useState<User | null>(null)

    const getUserData = useCallback(async (): Promise<void> => {
        const response: Response = await fetch(USER_DATA_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authState?.token}`
            }
        })

        if (!response.ok) {
            return
        }

        const { userDetails }: UserDataResponse = await response.json()

        setUser(userDetails)
    }, [authState])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    return { user }
}
