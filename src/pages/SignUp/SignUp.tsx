import React, { FunctionComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input'
import { CREDENTIALS_ERROR, SERVER_ERROR, SIGN_UP_API_URL } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignUpCredentials } from '../../types/credentials/SignUpCredentials'
import styles from '../SignIn/SignIn.module.scss'

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

    if (authState) {
        return <Redirect to='/' />
    }

    if (fetchError === SERVER_ERROR) {
        return <Redirect to='/error' />
    }

    return (
        <>
            <form className={styles.root} onSubmit={authenticate}>
                <h2>Sign Up.</h2>
                {fetchError === CREDENTIALS_ERROR && (
                    <span className={styles.error}>Email already in use.</span>
                )}

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
                <Input
                    type='password'
                    label='Confirm Password*'
                    name='confirm-password'
                    onChange={changeHandler}
                    value={credentials['confirm-password']}
                    error={
                        credentialsErrors.includes('confirm-password')
                            ? 'Password and Confirm password should match'
                            : ''
                    }
                    onFocus={focusHandler}
                />
                <Button disabled={!canSubmit} loading={String(loading)} type='submit'>
                    Sign Up
                </Button>
                <p>
                    Already have an account?<Link to='/sign-in'>Sign in.</Link>
                </p>
            </form>
        </>
    )
}
