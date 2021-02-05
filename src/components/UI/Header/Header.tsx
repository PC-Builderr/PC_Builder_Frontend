import React, { FunctionComponent } from 'react'
import styles from './Header.module.scss'

interface Props {
    children: React.ReactNode
}

export const Header: FunctionComponent<Props> = props => {
    return <h3 className={styles.root}>{props.children}</h3>
}
