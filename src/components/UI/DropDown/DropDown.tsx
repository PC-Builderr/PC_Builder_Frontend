import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useClickAway } from '../../../hooks/useClickAway'
import styles from './DropDown.module.scss'

interface Props {
    open?: boolean
    label: string
    children: React.ReactNode[]
}

export const DropDown: React.FC<Props> = props => {
    const { isOpen, close, open } = useClickAway(props.open)

    return (
        <li className={styles.root}>
            <button onClick={isOpen ? close : open}>
                {props.label}
                <IoIosArrowDown
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : ''
                    }}
                />
            </button>
            {isOpen && (
                <ul onClick={close}>
                    {props.children.map((child: React.ReactNode, index: number) => (
                        <li key={index}>{child}</li>
                    ))}
                </ul>
            )}
        </li>
    )
}
