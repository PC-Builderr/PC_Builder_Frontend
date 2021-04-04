import { Button, Popover } from '@material-ui/core'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useLocation } from 'react-router'
import styles from './DropDown.module.scss'

interface Props {
    label: string
}

export const DropDown: FunctionComponent<Props> = props => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const ref = useRef<HTMLButtonElement | null>(null)

    const { pathname } = useLocation()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <li className={styles.root}>
            <Button
                ref={ref}
                onClick={() => {
                    setIsOpen((f: boolean) => !f)
                }}
            >
                {props.label}
                <IoIosArrowDown
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : ''
                    }}
                />
            </Button>
            <Popover
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => {
                    setIsOpen(false)
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <div className={styles.popover}>{props.children}</div>
            </Popover>
        </li>
    )
}
