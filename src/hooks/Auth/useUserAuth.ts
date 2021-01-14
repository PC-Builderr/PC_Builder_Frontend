import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { AuthContextState } from '../../context/Auth/AuthContextState'
import { Credential } from '../../types/credentials/Credential'
import { Error } from '../../types/Error'
import { Change, Submit } from '../../types/Events'
import { ChangeHandler, SubmitHandler } from '../../types/Handlers'
import { useFetch } from '../useFetch'

interface UserAuth {
    state: State
    methods: Methods
}

interface State {
    authState: AuthContextState | null
    credentials: Credential[]
    canSubmit: boolean
    error: Error | null
}

interface Methods {
    signIn: SubmitHandler
    signUp: SubmitHandler
    changeHandler: ChangeHandler<HTMLInputElement>
}

export const useUserAuth = (initialCredentials: Credential[]): UserAuth => {
    const { authState, setAuthState } = useContext<AuthContextInterface>(AuthContext)

    const { fetchData, state } = useFetch<AuthContextState>()
    const { data, error, loading } = state

    const [credentials, setCredentials] = useState<Credential[]>(initialCredentials)

    const [canSubmit, setCanSubmit] = useState<boolean>(false)

    const changeHandler = useCallback((event: Change<HTMLInputElement>) => {
        setCredentials((currentValues: Credential[]) =>
            currentValues.map((credential: Credential) => {
                if (event.target.name === credential.name) {
                    return { name: credential.name, value: event.target.value }
                }
                return credential
            })
        )
    }, [])

    const signIn = useCallback(
        (event: Submit) => {
            event.preventDefault()

            fetchData(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
                method: 'POST',
                body: JSON.stringify(
                    credentials.reduce((acc: any, credential: Credential) => {
                        return { ...acc, [credential.name]: credential.value }
                    }, {})
                )
            })
        },
        [fetchData, credentials]
    )

    const signUp = useCallback(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
            method: 'POST',
            body: JSON.stringify(
                credentials.map(credential => ({ [credential.name]: credential.value }))
            )
        })
    }, [fetchData, credentials])

    useEffect(() => {
        setCanSubmit(validateCredentials(credentials) && !loading)
    }, [credentials, loading])

    useEffect(() => {
        setAuthState(data)
    }, [data, setAuthState])

    return {
        state: {
            authState,
            credentials,
            canSubmit,
            error
        },
        methods: {
            signIn,
            signUp,
            changeHandler
        }
    }
}

const validateCredentials = (credentials: Credential[]): boolean => {
    if (credentials.find((credential: Credential) => credential.value.trim() === '')) {
        return false
    }

    const email: Credential | undefined = credentials.find(
        (credential: Credential) => credential.name === 'email'
    )

    if (!email!.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        return false
    }

    const password: Credential | undefined = credentials.find(
        (credential: Credential) => credential.name === 'password'
    )

    if (!password!.value.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        return false
    }

    const confirmPassword: Credential | undefined = credentials.find(
        (credential: Credential) => credential.name === 'confirm-password'
    )

    if (confirmPassword && confirmPassword !== password) {
        return false
    }

    return true
}
