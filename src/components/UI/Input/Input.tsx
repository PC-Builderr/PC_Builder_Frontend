import React, { FunctionComponent } from 'react'
import { ChangeHandler, FocusHandler } from '../../../types/Handlers'
import { Label } from '../Label'
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
    list?: string
    minLength?: number
    maxLength?: number
    pattern?: string
    autoComplete?: string
}

export const Input: FunctionComponent<Props> = props => {
    return (
        <>
            {props.label && (
                <Label error={props.error} htmlFor={props.name}>
                    {props.label}
                </Label>
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
