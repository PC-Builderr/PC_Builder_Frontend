import React from 'react'
import styles from './Backdrop.module.scss'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const Backdrop: React.FC<Props> = props => {
    if (!props.isOpen) return <></>

    return <div onClick={props.onClose} className={styles.root}></div>
}
