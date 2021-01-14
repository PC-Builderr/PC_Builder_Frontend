import React from 'react'
import { ChangeHandler } from '../../../types/Handlers'
import styles from './Input.module.scss'

interface Props {
    type: string
    name: string
    value: string
    onChange: ChangeHandler<HTMLInputElement>
    placeholder?: string
    label?: string
    required?: boolean
    id: string
}

export const Input: React.FC<Props> = props => {
    return (
        <>
            {props.label && (
                <label className={styles.label} htmlFor={props.id}>
                    {props.label}
                </label>
            )}
            <input className={styles.root} {...props} />
        </>
    )
}
