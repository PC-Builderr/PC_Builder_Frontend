import React from 'react'
import styles from './Loader.module.scss'

interface Props {}

export const Loader: React.FC<Props> = props => {
    return <div className={styles.root}></div>
}
