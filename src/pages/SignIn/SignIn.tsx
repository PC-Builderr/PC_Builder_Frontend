import React, { useCallback, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ErrorCard } from '../../components/UI/ErrorCard'
import { Input } from '../../components/UI/Input'
import { SERVER_ERROR, SIGN_IN_API_URL } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignInCredentials } from '../../types/credentials/SignInCredentials'
import styles from './SignIn.module.scss'

interface Props {}

export const SignIn: React.FC<Props> = props => {
    const [isShown, setIsShown] = useState<boolean>(false)

    const {
        methods: { changeHandler, authenticate, focusHandler, clearErrors },
        state: { canSubmit, credentials, authState, credentialsErrors }
    } = useUserAuth<SignInCredentials>(SIGN_IN_API_URL, [
        { name: 'email', value: '' },
        { name: 'password', value: '' }
    ])

    const closeHandler = useCallback(() => {
        clearErrors()
        setIsShown(false)
    }, [clearErrors])

    useEffect(() => {
        if (credentialsErrors.length) {
            setIsShown(true)
        }
    }, [credentialsErrors])

    if (authState) {
        return <Redirect to='/' />
    }

    if (credentialsErrors.includes(SERVER_ERROR)) {
        return <Redirect to='/error' />
    }

    return (
        <>
            <ErrorCard
                className={styles.error}
                onClose={closeHandler}
                isShown={isShown && Boolean(credentialsErrors.length)}
            >
                {credentialsErrors.map((error: string) => (
                    <p key={error}>Invalid {error}.</p>
                ))}
            </ErrorCard>

            <form
                style={{ marginTop: isShown ? '2rem' : '3rem' }}
                className={styles.root}
                onSubmit={authenticate}
            >
                <h2>Sign In.</h2>

                <Input
                    type='text'
                    label='Email*'
                    name='email'
                    onChange={changeHandler}
                    value={credentials.email}
                    error={credentialsErrors.includes('email') ? 'error' : ''}
                    onFocus={focusHandler}
                />
                <Input
                    type='password'
                    label='Password*'
                    name='password'
                    onChange={changeHandler}
                    value={credentials.password}
                    error={credentialsErrors.includes('password') ? 'error' : ''}
                    onFocus={focusHandler}
                />
                <button disabled={!canSubmit} type='submit'>
                    Sign In
                </button>
                <p>
                    Don't have an account?<Link to='/sign-up'>Sign up.</Link>
                </p>
            </form>
        </>
    )
}
