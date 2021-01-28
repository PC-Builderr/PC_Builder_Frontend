import decode from 'jwt-decode'
import { useCallback, useContext, useEffect, useState } from 'react'
import { CREDENTIALS_ERROR, ONE_SECOND_IN_MS, SERVER_ERROR, SIGN_UP_API_URL } from '../../constants'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { AuthContextState } from '../../context/Auth/AuthContextState'
import { Credential } from '../../types/credentials/Credential'
import { Change, Focus, Submit } from '../../types/Events'
import { ChangeHandler, FocusHandler, SubmitHandler } from '../../types/Handlers'
import { DecodedToken } from '../../types/token/DecodedToken'
import { useIsMounted } from '../useIsMounted'

interface UserAuth<T> {
    state: State<T>
    methods: Methods
}

interface State<T> {
    authState: AuthContextState | null
    credentials: T
    loading: boolean
    canSubmit: boolean
    credentialsErrors: string[]
    fetchError: string | null
}

interface Methods {
    authenticate: SubmitHandler
    changeHandler: ChangeHandler<HTMLInputElement>
    focusHandler: FocusHandler
}

export const useUserAuth = <T>(url: string, initialCredentials: Credential[]): UserAuth<T> => {
    const { authState, setAuthState } = useContext<AuthContextInterface>(AuthContext)

    const [credentials, setCredentials] = useState<Credential[]>(initialCredentials)
    const [credentialsErrors, setCredentialsErrors] = useState<string[]>([])
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [canSubmit, setCanSubmit] = useState<boolean>(false)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const clearErrors = useCallback((event: Change<HTMLInputElement>) => {
        setFetchError(null)
        setCredentialsErrors((errors: string[]) =>
            errors.filter((error: string) => error !== event.target.name)
        )
    }, [])

    const changeHandler = useCallback(
        (event: Change<HTMLInputElement>) => {
            clearErrors(event)
            setCredentials((currentValues: Credential[]) =>
                currentValues.map((credential: Credential) => {
                    if (event.target.name === credential.name) {
                        return { name: credential.name, value: event.target.value }
                    }
                    return credential
                })
            )
        },
        [clearErrors]
    )

    const focusHandler = useCallback(
        (event: Focus) => {
            clearErrors(event)
        },
        [clearErrors]
    )

    const authenticate = useCallback(
        async (event: Submit) => {
            setLoading(true)

            event.preventDefault()

            if (url === SIGN_UP_API_URL) {
                const errors: string[] = validateCredentials(credentials)
                if (errors?.length) {
                    setCredentialsErrors(errors)
                    setLoading(false)
                    return
                }
            }

            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    credentials.reduce(
                        (acc: any, credential: Credential) => ({
                            ...acc,
                            [credential.name]: credential.value
                        }),
                        {}
                    )
                )
            })

            if (!isMounted.current) return

            const data = await response.json()

            if (!response.ok) {
                if (data!.statusCode < 500) {
                    setFetchError(CREDENTIALS_ERROR)
                } else {
                    setFetchError(SERVER_ERROR)
                }

                setLoading(false)
                return
            }

            const { exp, id }: DecodedToken = decode(data.token)

            setAuthState({
                exp: exp * ONE_SECOND_IN_MS,
                token: data.token,
                userId: id
            })
            setLoading(false)
        },
        [credentials, isMounted, setAuthState, url]
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

        if (credentialsErrors.length) {
            setCanSubmit(false)
            return
        }

        setCanSubmit(true)
    }, [credentials, loading, credentialsErrors])

    return {
        state: {
            authState,
            credentials: credentials.reduce(
                (acc: any, credential: Credential) => ({
                    ...acc,
                    [credential.name]: credential.value
                }),
                {}
            ),
            loading,
            canSubmit,
            credentialsErrors,
            fetchError
        },
        methods: {
            authenticate,
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
