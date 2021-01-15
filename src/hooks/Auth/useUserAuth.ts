import { useCallback, useContext, useEffect, useState } from 'react'
import { ONE_SECOND_IN_MS, SERVER_ERROR, WRONG_CREDENTIALS } from '../../constants'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { AuthContextState } from '../../context/Auth/AuthContextState'
import { Credential } from '../../types/credentials/Credential'
import { Change, Focus, Submit } from '../../types/Events'
import { ChangeHandler, FocusHandler, SubmitHandler } from '../../types/Handlers'
import { TokenResponse } from '../../types/token/TokenResponse'
import decode from 'jwt-decode'
import { useFetch } from '../useFetch'
import { DecodedToken } from '../../types/token/DecodedToken'

interface UserAuth<T> {
    state: State<T>
    methods: Methods
}

interface State<T> {
    authState: AuthContextState | null
    credentials: T
    canSubmit: boolean
    credentialsErrors: string[]
}

interface Methods {
    signIn: SubmitHandler
    signUp: SubmitHandler
    changeHandler: ChangeHandler<HTMLInputElement>
    focusHandler: FocusHandler
}

export const useUserAuth = <T>(initialCredentials: Credential[]): UserAuth<T> => {
    const { authState, setAuthState } = useContext<AuthContextInterface>(AuthContext)

    const { fetchData, state } = useFetch<TokenResponse>()
    const { data, error, loading } = state

    const [credentials, setCredentials] = useState<Credential[]>(initialCredentials)

    const [credentialsErrors, setCredentialsErrors] = useState<string[]>([])

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

    const focusHandler = useCallback((event: Focus) => {
        setCredentialsErrors((errors: string[]) =>
            errors.filter((error: string) => error !== event.target.name)
        )
    }, [])

    const signIn = useCallback(
        (event: Submit) => {
            event.preventDefault()

            const errors: string[] = validateCredentials(credentials)
            if (errors?.length) {
                setCredentialsErrors(errors)
                return
            }

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

    const signUp = useCallback(
        (event: Submit) => {
            event.preventDefault()

            const errors: string[] = validateCredentials(credentials)
            if (errors?.length) {
                setCredentialsErrors(errors)
                return
            }

            fetchData(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
                method: 'POST',
                body: JSON.stringify(
                    credentials.map(credential => ({ [credential.name]: credential.value }))
                )
            })
        },
        [fetchData, credentials]
    )

    useEffect(() => {
        if (credentials.find((credential: Credential) => credential.value.trim() === '')) {
            setCanSubmit(false)
            return
        }
        if (loading) {
            setCanSubmit(false)
            return
        }

        setCanSubmit(true)
    }, [credentials, loading])

    useEffect(() => {
        if (error && error?.statusCode < 500) {
            setCredentialsErrors((errors: string[]) => [...errors, WRONG_CREDENTIALS])
        }
        if (error && error?.statusCode >= 500) {
            setCredentialsErrors((errors: string[]) => [...errors, SERVER_ERROR])
        }
        setCredentialsErrors((errors: string[]) =>
            errors.filter((error: string) => error !== SERVER_ERROR || error !== WRONG_CREDENTIALS)
        )
    }, [error])

    useEffect(() => {
        if (!data) {
            return
        }

        const { exp, id }: DecodedToken = decode(data.token)

        setAuthState({
            exp: exp * ONE_SECOND_IN_MS,
            token: data.token,
            userId: id
        })
    }, [data, setAuthState])

    return {
        state: {
            authState,
            credentials: credentials.reduce((acc: any, credential: Credential) => {
                return { ...acc, [credential.name]: credential.value }
            }, {}),
            canSubmit,
            credentialsErrors
        },
        methods: {
            signIn,
            signUp,
            changeHandler,
            focusHandler
        }
    }
}

const validateCredentials = (credentials: Credential[]): string[] => {
    const errors: string[] = []

    const email: Credential | undefined = credentials.find(
        (credential: Credential) => credential.name === 'email'
    )

    if (!email!.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        errors.push('email')
    }

    const password: Credential | undefined = credentials.find(
        (credential: Credential) => credential.name === 'password'
    )

    if (!password!.value.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {
        errors.push('password')
    }

    const confirmPassword: Credential | undefined = credentials.find(
        (credential: Credential) => credential.name === 'confirm-password'
    )
    if (confirmPassword && confirmPassword.value !== password?.value) {
        errors.push('confirm-password')
    }

    return errors
}
