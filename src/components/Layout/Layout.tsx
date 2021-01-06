import React from 'react'
import { NavBar } from './NavBar'
import styles from './Layout.module.scss'

interface Props {
    children: React.ReactElement
}

export const Layout: React.FC<Props> = props => {
    return (
        <>
            <NavBar />
            <main className={styles.root}></main>
        </>
    )
}
