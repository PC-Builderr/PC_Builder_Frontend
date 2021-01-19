import React from 'react'
import { ChangeHandler, FocusHandler } from '../../../types/Handlers'
import styles from './Input.module.scss'

interface Props {
    type?: string
    name?: string
    value?: string
    onChange?: ChangeHandler<HTMLInputElement>
    onFocus?: FocusHandler
    placeholder?: string
    label?: string
    required?: boolean
    error?: string
}

export const Input: React.FC<Props> = props => {
    return (
        <>
            {props.label && (
                <label
                    className={styles.label}
                    style={props.error ? { color: 'red' } : undefined}
                    htmlFor={props.name}
                >
                    {props.label}
                </label>
            )}
            <input
                className={styles.root}
                style={props.error ? { borderColor: 'red' } : undefined}
                id={props.name}
                {...props}
            />
            {props.error && <span className={styles.error}>{props.error}</span>}
        </>
    )
}
