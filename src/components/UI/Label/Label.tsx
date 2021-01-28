import React, { FunctionComponent } from 'react'
import styles from './Label.module.scss'

interface Props {
    error?: string
    htmlFor?: string
    children?: React.ReactNode
    className?: string
}

export const Label: FunctionComponent<Props> = props => {
    return (
        <label
            className={[styles.root, props.className].join(' ')}
            style={props.error ? { color: 'red' } : undefined}
            htmlFor={props.htmlFor}
        >
            {props.children}
        </label>
    )
}
