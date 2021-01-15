import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ErrorCard } from '../../components/UI/ErrorCard'
import { Input } from '../../components/UI/Input'
import { SERVER_ERROR } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignInCredentials } from '../../types/credentials/SignInCredentials'
import styles from './SignIn.module.scss'

interface Props {}

export const SignIn: React.FC<Props> = props => {
    const {
        methods: { changeHandler, signIn },
        state: { canSubmit, credentials, authState, credentialsErrors }
    } = useUserAuth<SignInCredentials>([
        { name: 'email', value: '' },
        { name: 'password', value: '' }
    ])

    if (authState) {
        return <Redirect to='/' />
    }

    return (
        <>
            {credentialsErrors.includes(SERVER_ERROR) ? <Redirect to='/error' /> : null}
            {credentialsErrors.length ? (
                <ErrorCard className={styles.error}>
                    {credentialsErrors.map((error: string) => (
                        <p key={error}>Invalid {error}.</p>
                    ))}
                </ErrorCard>
            ) : null}

            <form
                style={{ marginTop: credentialsErrors.length ? '2rem' : '5rem' }}
                className={styles.root}
                onSubmit={signIn}
            >
                <h2>Sign In.</h2>

                <Input
                    type='text'
                    label='Email*'
                    name='email'
                    onChange={changeHandler}
                    value={credentials.email}
                    error={credentialsErrors.includes('email') ? 'error' : ''}
                />
                <Input
                    type='password'
                    label='Password*'
                    name='password'
                    onChange={changeHandler}
                    value={credentials.password}
                    error={credentialsErrors.includes('password') ? 'error' : ''}
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
