import React from 'react'
import { Footer } from './Footer'
import classes from './Layout.module.scss'
import { NavBar } from './NavBar'

interface Props {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = props => {
    return (
        <>
            <NavBar />
            <main className={classes.Main}>{props.children}</main>
            {/* <Footer /> */}
        </>
    )
}
