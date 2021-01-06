import React from 'react'
import styles from './NotFound.module.scss'

interface Props {}

export const NotFound: React.FC<Props> = props => {
    return (
        <li className={styles.root}>
            <p>No Products Found</p>
        </li>
    )
}
