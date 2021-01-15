import React from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import styles from './ErrorCard.module.scss'

interface Props {
    children: React.ReactNode | React.ReactNode[]
    style?: React.CSSProperties
    className?: string
    isShown: boolean
    onClose: () => void
}

export const ErrorCard: React.FC<Props> = props => {
    if (!props.isShown) {
        return null
    }

    return (
        <div style={props.style} className={[styles.root, props.className].join(' ')}>
            <button onClick={props.onClose}>
                <VscChromeClose />
            </button>
            <h3>Error</h3>
            {props.children}
        </div>
    )
}
