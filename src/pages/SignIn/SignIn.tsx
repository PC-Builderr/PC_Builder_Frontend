import { TextField, Typography, Link } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link as RouterLink, Redirect, useLocation } from 'react-router-dom'
import { PrimaryButton } from '../../components/UI/PrimaryButton/PrimaryButton'
import { Input } from '../../components/UI/Input'
import { SERVER_ERROR, SIGN_IN_API_URL, CREDENTIALS_ERROR } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignInCredentials } from '../../types/credentials/SignInCredentials'
import styles from './SignIn.module.scss'
import { Alert } from '@material-ui/lab'

export const SignIn: FunctionComponent = () => {
    const {
        methods: { changeHandler, authenticate, focusHandler },
        state: { credentials, authState, fetchError, loading, credentialsErrors }
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
                <Typography variant='h4'>Sign In.</Typography>
                {fetchError === CREDENTIALS_ERROR && (
                    <Alert className={styles.error} variant='outlined' severity='error'>
                        Invalid email or password.
                    </Alert>
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
                <PrimaryButton loading={loading} type='submit'>
                    Sign In
                </PrimaryButton>
                <Typography variant='body2'>
                    Don't have an account?
                    <Link variant='subtitle2' component={RouterLink} to={`/sign-up${search}`}>
                        Sign up.
                    </Link>
                </Typography>
            </form>
        </>
    )
}
