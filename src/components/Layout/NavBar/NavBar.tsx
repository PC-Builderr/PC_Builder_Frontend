import React from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

import { SearchInput } from '../../UI/Search'
import styles from './NavBar.module.scss'
import { DropDown } from '../../UI/DropDown'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'

interface Props {
    openSideDrawerHandler: () => void
}

export const NavBar: React.FC<Props> = props => {
    return (
        <header className={styles.root}>
            <nav>
                <WithMediaQuery minWidth={1000}>
                    <button className={styles.burger} onClick={props.openSideDrawerHandler}>
                        <HiOutlineMenuAlt2 />
                    </button>
                </WithMediaQuery>
                <WithMediaQuery maxWidth={1000}>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <DropDown label='Products'>
                            <Link to='/products/cpu'>CPU</Link>
                            <Link to='/products/gpu'>Graphics Card</Link>
                            <Link to='/products/case'>Case</Link>
                            <Link to='/products/motherboard'>Motherboard</Link>
                            <Link to='/products/psu'>Power Supply</Link>
                            <Link to='/products/ram'>RAM</Link>
                            <Link to='/products/storage'>Storage</Link>
                        </DropDown>
                        <li>
                            <Link to='/pc-builder'>Build your PC</Link>
                        </li>
                    </ul>
                </WithMediaQuery>
                <SearchInput />
                <WithMediaQuery maxWidth={550}>
                    <ul>
                        <li>
                            <Link to='/cart'>
                                <RiShoppingCartLine />
                            </Link>
                        </li>
                        <DropDown label='Profile'>
                            <Link to='/profile'>Profile</Link>
                            <Link to='/sign-in'>Sign in</Link>
                        </DropDown>
                    </ul>
                </WithMediaQuery>
            </nav>
        </header>
    )
}
