import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import styles from './Button.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
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
