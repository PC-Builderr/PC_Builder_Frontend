import { useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'

export const useUser = () => {
    const { authState } = useContext<AuthContextInterface>(AuthContext)
}
