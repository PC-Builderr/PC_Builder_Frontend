import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import styles from './Layout.module.scss'
import { SideDrawer } from './SideDrawer/SideDrawer'
import { useLocation } from 'react-router-dom'
import { WithMediaQuery } from '../../hoc/WithMediaQuery'
import { Container } from '@material-ui/core'
import { Footer } from './Footer'

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
                <SideDrawer isOpen={isOpen} onClose={closeSideDrawer} onOpen={openSideDrawer} />
            </WithMediaQuery>
            <Container className={styles.root} maxWidth='lg'>
                {props.children}
            </Container>
            {/* <Footer /> */}
        </>
    )
}
