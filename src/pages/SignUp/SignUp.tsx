import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ErrorCard } from '../../components/UI/ErrorCard'
import { Input } from '../../components/UI/Input'
import { SERVER_ERROR } from '../../constants'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'
import { SignUpCredentials } from '../../types/credentials/SignUpCredentials'
import styles from '../SignIn/SignIn.module.scss'

interface Props {}

export const SignUp: React.FC<Props> = props => {
    const {
        methods: { changeHandler, signUp },
        state: { canSubmit, credentials, authState, credentialsErrors }
    } = useUserAuth<SignUpCredentials>([
        { name: 'name', value: '' },
        { name: 'email', value: '' },
        { name: 'password', value: '' },
        { name: 'confirm-password', value: '' }
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
                onSubmit={signUp}
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
                />
                <Input
                    type='password'
                    label='Password*'
                    name='password'
                    onChange={changeHandler}
                    value={credentials.password}
                    error={credentialsErrors.includes('password') ? 'error' : ''}
                />
                <Input
                    type='password'
                    label='Confirm Password*'
                    name='confirm-password'
                    onChange={changeHandler}
                    value={credentials['confirm-password']}
                    error={credentialsErrors.includes('confirm-password') ? 'error' : ''}
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
