import { CircularProgress } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Loader.module.scss'

export const Loader: FunctionComponent = () => {
    return <CircularProgress className={styles.root} />
}
