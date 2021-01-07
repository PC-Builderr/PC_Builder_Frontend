import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './SideDrawer.module.scss'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const SideDrawer: React.FC<Props> = props => {
    return (
        <aside className={props.isOpen ? styles.root : [styles.root, styles.open].join(' ')}>
            <button onClick={props.onClose}>
                <AiOutlineClose />
            </button>
        </aside>
    )
}
