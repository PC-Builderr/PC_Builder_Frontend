import React, { FunctionComponent } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { ChangeHandler, ClickHandler } from '../../../types/Handlers'
import styles from './Button.module.scss'

interface Props {
    id?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    disabled?: boolean
    className?: string
    onClick?: ClickHandler<HTMLButtonElement>
    children: React.ReactNode
    loading?: string
}

export const Button: FunctionComponent<Props> = props => {
    return (
        <button className={[styles.root, props.className].join(' ')} {...props}>
            {props.loading === 'true' ? (
                <>
                    Processing <BiLoaderAlt className={styles.spinner} />
                </>
            ) : (
                props.children
            )}
        </button>
    )
}
