import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import styles from './Layout.module.scss'
import { SideDrawer } from './SideDrawer/SideDrawer'
import { Backdrop } from '../UI/Backdrop'
import { useLocation } from 'react-router-dom'
import { WithMediaQuery } from '../../hoc/WithMediaQuery'

interface Props {
    children: React.ReactElement
}

export const Layout: FunctionComponent<Props> = props => {
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
            <WithMediaQuery minWidth={1000}>
                <>
                    <Backdrop isOpen={isOpen} onClose={closeSideDrawer} />
                    <SideDrawer isOpen={isOpen} onClose={closeSideDrawer} />
                </>
            </WithMediaQuery>
            <main className={styles.root}>{props.children}</main>
        </>
    )
}
