import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Input } from '../../components/UI/Input'
import { SERVER_ERROR, SIGN_IN_API_URL, CREDENTIALS_ERROR } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignInCredentials } from '../../types/credentials/SignInCredentials'
import styles from './SignIn.module.scss'

interface Props {}

export const SignIn: React.FC<Props> = props => {
    const {
        methods: { changeHandler, authenticate, focusHandler },
        state: { canSubmit, credentials, authState, credentialsErrors, fetchError }
    } = useUserAuth<SignInCredentials>(SIGN_IN_API_URL, [
        { name: 'email', value: '' },
        { name: 'password', value: '' }
    ])

    if (authState) {
        return <Redirect to='/' />
    }

    if (fetchError === SERVER_ERROR) {
        return <Redirect to='/error' />
    }

    return (
        <>
            <form className={styles.root} onSubmit={authenticate}>
                <h2>Sign In.</h2>
                {fetchError === CREDENTIALS_ERROR && (
                    <span className={styles.error}> Invalid email or password. </span>
                )}

                <Input
                    type='text'
                    label='Email*'
                    name='email'
                    onChange={changeHandler}
                    value={credentials.email}
                    error={
                        credentialsErrors.includes('email') ? 'Please provide a valid email.' : ''
                    }
                    onFocus={focusHandler}
                />
                <Input
                    type='password'
                    label='Password*'
                    name='password'
                    onChange={changeHandler}
                    value={credentials.password}
                    error={
                        credentialsErrors.includes('password')
                            ? 'Password sould have numbers and letters.'
                            : ''
                    }
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
