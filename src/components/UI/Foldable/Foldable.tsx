import React, { Children } from 'react'
import styles from './Foldable.module.scss'

interface Props {
    name: string
    children: React.ReactNode[] | React.ReactNode
}

export const Foldable: React.FC<Props> = props => {
    return (
        <li className={styles.root}>
            <p>{props.name}</p>
            <ul>{props.children}</ul>
        </li>
    )
}
