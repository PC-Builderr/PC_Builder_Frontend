import React from 'react'
import styles from './ErrorCard.module.scss'

interface Props {
    children: React.ReactNode | React.ReactNode[]
    style?: React.CSSProperties
    className?: string
}

export const ErrorCard: React.FC<Props> = props => {
    return (
        <div style={props.style} className={[styles.root, props.className].join(' ')}>
            <h3>Error</h3>
            {props.children}
        </div>
    )
}
