import React, { FunctionComponent } from 'react'
import { Label } from '../Label'
import styles from './Input.module.scss'

interface Props
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
    error?: string
}

export const Input: FunctionComponent<Props> = props => {
    return (
        <>
            {props.label && (
                <Label error={props.error} htmlFor={props.id}>
                    {props.label}
                </Label>
            )}
            <input
                className={styles.root}
                style={props.error ? { borderColor: 'red' } : undefined}
                {...props}
            />
            {props.error && <span className={styles.error}>{props.error}</span>}
        </>
    )
}
