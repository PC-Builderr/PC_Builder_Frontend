import React, { FunctionComponent } from 'react'
import styles from './Backdrop.module.scss'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const Backdrop: FunctionComponent<Props> = props => {
    if (!props.isOpen) return <></>

    return <div onClick={props.onClose} className={styles.root}></div>
}
