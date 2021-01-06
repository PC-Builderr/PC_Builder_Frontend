import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './SideDrawer.module.scss'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const SideDrawer: React.FC<Props> = props => {
    return (
        <aside
            className={styles.root}
            style={{ transform: !props.isOpen ? 'translateX(-100%)' : '' }}
        >
            <button onClick={props.onClose}>
                <AiOutlineClose />
            </button>
        </aside>
    )
}
