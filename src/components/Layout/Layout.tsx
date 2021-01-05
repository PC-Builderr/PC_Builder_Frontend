import React from 'react'
import { DropDown } from '../UI/DropDown'
import { Footer } from './Footer'
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
