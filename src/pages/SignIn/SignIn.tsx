import React, { FunctionComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input'
import { SERVER_ERROR, SIGN_IN_API_URL, CREDENTIALS_ERROR } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignInCredentials } from '../../types/credentials/SignInCredentials'
import styles from './SignIn.module.scss'

export const SignIn: FunctionComponent = () => {
    const {
        methods: { changeHandler, authenticate, focusHandler },
        state: { canSubmit, credentials, authState, fetchError, loading }
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
                    onFocus={focusHandler}
                />
                <Input
                    type='password'
                    label='Password*'
                    name='password'
                    onChange={changeHandler}
                    value={credentials.password}
                    onFocus={focusHandler}
                />
                <Button disabled={!canSubmit} loading={String(loading)} type='submit'>
                    Sign In
                </Button>
                <p>
                    Don't have an account?<Link to='/sign-up'>Sign up.</Link>
                </p>
            </form>
        </>
    )
}
