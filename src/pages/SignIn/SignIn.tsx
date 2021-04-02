import { TextField } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
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

    const { search } = useLocation()
    const params: URLSearchParams = new URLSearchParams(search)

    if (authState) {
        const path: string | null = params.get('to')

        if (!path) {
            return <Redirect to='/' />
        }

        return <Redirect to={path} />
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

                <TextField
                    type='text'
                    label='Email'
                    name='email'
                    onChange={changeHandler}
                    value={credentials.email}
                    onFocus={focusHandler}
                    fullWidth
                    variant='outlined'
                    className={styles.Input}
                />
                <TextField
                    type='password'
                    label='Password'
                    name='password'
                    onChange={changeHandler}
                    value={credentials.password}
                    onFocus={focusHandler}
                    fullWidth
                    variant='outlined'
                    className={styles.Input}
                />
                <Button disabled={!canSubmit} loading={String(loading)} type='submit'>
                    Sign In
                </Button>
                <p>
                    Don't have an account?<Link to={`/sign-up${search}`}>Sign up.</Link>
                </p>
            </form>
        </>
    )
}
