import React from 'react'
import classes from './Layout.module.scss'
import { NavBar } from './NavBar'

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export const Layout: React.FC<Props> = props => {
    return (
        <>
            <NavBar />
            <main className={classes.root}>{props.children}</main>
            {/* <Footer /> */}
        </>
    )
}
