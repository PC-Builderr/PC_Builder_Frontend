import React, { useState } from 'react'
import { NavBar } from './NavBar'
import styles from './Layout.module.scss'
import { SideDrawer } from './SideDrawer/SideDrawer'

interface Props {
    children: React.ReactElement
}

export const Layout: React.FC<Props> = props => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <NavBar openSideDrawerHandler={() => setIsOpen(true)} />
            <SideDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <main className={styles.root}>{props.children}</main>
        </>
    )
}
