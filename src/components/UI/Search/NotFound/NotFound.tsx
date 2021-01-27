import React, { FunctionComponent } from 'react'
import styles from './NotFound.module.scss'

export const NotFound: FunctionComponent = () => {
    return (
        <li className={styles.root}>
            <p>No Products Found</p>
        </li>
    )
}
