import React from 'react'
import { ChangeHandler, ClickHandler } from '../../../types/Handlers'
import styles from './Button.module.scss'

interface Props {
    id?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    disabled?: boolean
    className?: string
    onClick?: ClickHandler<HTMLButtonElement>
    children: React.ReactNode
}

export const Button: React.FC<Props> = props => {
    return (
        <button className={[styles.root, props.className].join(' ')} {...props}>
            {props.children}
        </button>
    )
}
