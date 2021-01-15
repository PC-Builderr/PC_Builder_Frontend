import React, { useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import styles from './Home.module.scss'

interface Props {}

export const Home: React.FC<Props> = props => {
    const { authState } = useContext<AuthContextInterface>(AuthContext)

    return (
        <div className={styles.root}>
            <pre>{JSON.stringify(authState, null, 2)}</pre>
        </div>
    )
}
