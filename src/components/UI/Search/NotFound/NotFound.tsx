import React from 'react'
import styles from './NotFound.module.scss'

export const NotFound: React.FC = () => {
    return (
        <li className={styles.root}>
            <p>No Products Found</p>
        </li>
    )
}
