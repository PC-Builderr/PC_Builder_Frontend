import { TextField, Typography, Link } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link as RouterLink, Redirect, useLocation } from 'react-router-dom'
import { PrimaryButton } from '../../components/UI/PrimaryButton/PrimaryButton'
import { CREDENTIALS_ERROR, SERVER_ERROR, SIGN_UP_API_URL } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignUpCredentials } from '../../types/credentials/SignUpCredentials'
import styles from '../SignIn/SignIn.module.scss'
import { Alert } from '@material-ui/lab'

export const SignUp: FunctionComponent = () => {
    const {
        methods: { changeHandler, authenticate, focusHandler },
        state: { canSubmit, credentials, authState, credentialsErrors, fetchError, loading }
    } = useUserAuth<SignUpCredentials>(SIGN_UP_API_URL, [
        { name: 'name', value: '' },
        { name: 'email', value: '' },
        { name: 'password', value: '' },
        { name: 'confirm-password', value: '' }
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
                <Typography variant='h4'>Sign Up.</Typography>
                {fetchError === CREDENTIALS_ERROR && (
                    <Alert className={styles.error} variant='outlined' severity='error'>
                        Email already in use.
                    </Alert>
                )}

                <TextField
                    type='text'
                    label='Name'
                    name='name'
                    onChange={changeHandler}
                    value={credentials.name}
                    fullWidth
                    variant='outlined'
                    className={styles.Input}
                />
                <TextField
                    type='text'
                    label='Email'
                    name='email'
                    onChange={changeHandler}
                    value={credentials.email}
                    error={credentialsErrors.includes('email')}
                    helperText={
                        credentialsErrors.includes('email') ? 'Please provide a valid email.' : null
                    }
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
                    error={credentialsErrors.includes('password')}
                    helperText={
                        credentialsErrors.includes('password')
                            ? 'Password sould have numbers and letters.'
                            : null
                    }
                    onFocus={focusHandler}
                    fullWidth
                    variant='outlined'
                    className={styles.Input}
                />
                <TextField
                    type='password'
                    label='Confirm Password'
                    name='confirm-password'
                    onChange={changeHandler}
                    value={credentials['confirm-password']}
                    error={credentialsErrors.includes('confirm-password')}
                    helperText={
                        credentialsErrors.includes('confirm-password')
                            ? 'Password and Confirm password should match'
                            : null
                    }
                    onFocus={focusHandler}
                    fullWidth
                    variant='outlined'
                    className={styles.Input}
                />
                <PrimaryButton loading={loading} type='submit'>
                    Sign Up
                </PrimaryButton>
                <Typography variant='body2'>
                    Already have an account?
                    <Link variant='subtitle2' component={RouterLink} to={`/sign-in${search}`}>
                        Sign in.
                    </Link>
                </Typography>
            </form>
        </>
    )
}
