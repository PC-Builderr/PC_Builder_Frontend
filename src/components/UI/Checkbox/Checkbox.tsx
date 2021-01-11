import React from 'react'
import styles from './Checkbox.module.scss'

interface Props {
    name: string
    id: string
    value: string | number
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<Props> = props => {
    return (
        <li className={styles.root}>
            <input type='checkbox' {...props} />
            <label htmlFor={props.id}>{props.name}</label>
        </li>
    )
}
