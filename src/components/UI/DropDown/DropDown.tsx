import React, { useCallback, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './DropDown.module.scss'

interface Props {
    open?: boolean
    label: string
    children: React.ReactNode | React.ReactNode[]
}

export const DropDown: React.FC<Props> = props => {
    const [isOpen, setIsOpen] = useState<boolean>(props.open || false)

    const close = useCallback(() => {
        setIsOpen(false)
        window.removeEventListener('click', close)
    }, [])

    const open = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            setIsOpen((state: boolean) => !state)
            window.addEventListener('click', close)
        },
        [close]
    )

    return (
        <li className={styles.root}>
            <button onClick={open}>
                {props.label}
                <IoIosArrowDown
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : ''
                    }}
                />
            </button>
            {isOpen ? <ul onClick={close}>{props.children}</ul> : null}
        </li>
    )
}
