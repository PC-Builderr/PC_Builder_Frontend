import React, { useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { useLogout } from '../../hooks/Auth/useLogout'
import styles from './Home.module.scss'

interface Props {}

export const Home: React.FC<Props> = props => {
    return <div className={styles.root}></div>
}
