import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Input } from '../../components/UI/Input'
import styles from './SignIn.module.scss'
import { useUserAuth } from '../../hooks/Auth/useUserAuth'

interface Props {}

export const SignIn: React.FC<Props> = props => {
    const {
        methods: { changeHandler, signIn },
        state: { canSubmit, credentials, authState }
    } = useUserAuth([
        { name: 'email', value: '' },
        { name: 'password', value: '' }
    ])

    if (authState) {
        return <Redirect to='/' />
    }

    return (
        <form className={styles.root} onSubmit={signIn}>
            <h2>Sign In.</h2>

            <Input
                id='email'
                type='email'
                label='Email'
                name='email'
                onChange={changeHandler}
                value={credentials.find(c => c.name === 'email')!.value}
                required
            />
            <Input
                id='password'
                type='password'
                label='Password'
                name='password'
                onChange={changeHandler}
                value={credentials.find(c => c.name === 'password')!.value}
                required
            />
            <button disabled={!canSubmit} type='submit'>
                Sign In
            </button>
            <p>
                Don't have an account?<Link to='/sign-up'>Sign up.</Link>
            </p>
        </form>
    )
}
