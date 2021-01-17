import React, { useCallback, useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import styles from './Layout.module.scss'
import { SideDrawer } from './SideDrawer/SideDrawer'
import { Backdrop } from '../UI/Backdrop'
import { useLocation } from 'react-router-dom'

interface Props {
    children: React.ReactElement
}

export const Layout: React.FC<Props> = props => {
    const location = useLocation<Location>()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openSideDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const closeSideDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    useEffect(() => {
        setIsOpen(false)
    }, [location])

    return (
        <>
            <NavBar openSideDrawerHandler={openSideDrawer} />
            <Backdrop isOpen={isOpen} onClose={closeSideDrawer} />
            <SideDrawer isOpen={isOpen} onClose={closeSideDrawer} />
            <main className={styles.root}>{props.children}</main>
        </>
    )
}
