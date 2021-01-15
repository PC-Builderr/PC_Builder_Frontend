import React, { useCallback, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ErrorCard } from '../../components/UI/ErrorCard'
import { Input } from '../../components/UI/Input'
import { SERVER_ERROR, SIGN_UP_API_URL } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignUpCredentials } from '../../types/credentials/SignUpCredentials'
import styles from '../SignIn/SignIn.module.scss'

interface Props {}

export const SignUp: React.FC<Props> = props => {
    const [isShown, setIsShown] = useState<boolean>(false)

    const {
        methods: { changeHandler, authenticate, focusHandler },
        state: { canSubmit, credentials, authState, credentialsErrors }
    } = useUserAuth<SignUpCredentials>(SIGN_UP_API_URL, [
        { name: 'name', value: '' },
        { name: 'email', value: '' },
        { name: 'password', value: '' },
        { name: 'confirm-password', value: '' }
    ])

    const closeHandler = useCallback(() => {
        setIsShown(false)
    }, [])

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
                style={{ marginTop: isShown ? '2rem' : '5rem' }}
                className={styles.root}
                onSubmit={authenticate}
            >
                <h2>Sign Up.</h2>
                <Input
                    type='text'
                    label='Name*'
                    name='name'
                    onChange={changeHandler}
                    value={credentials.name}
                />
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
                <Input
                    type='password'
                    label='Confirm Password*'
                    name='confirm-password'
                    onChange={changeHandler}
                    value={credentials['confirm-password']}
                    error={credentialsErrors.includes('confirm-password') ? 'error' : ''}
                    onFocus={focusHandler}
                />
                <button disabled={!canSubmit} type='submit'>
                    Sign In
                </button>
                <p>
                    Already have an account?<Link to='/sign-in'>Sign in.</Link>
                </p>
            </form>
        </>
    )
}
