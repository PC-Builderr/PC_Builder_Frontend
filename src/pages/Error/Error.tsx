import React, { FunctionComponent } from 'react'
import styles from './Error.module.scss'

interface Props {}

export const Error: FunctionComponent<Props> = props => {
    return (
        <div className={styles.root}>
            <h3>Error</h3>
        </div>
    )
}
