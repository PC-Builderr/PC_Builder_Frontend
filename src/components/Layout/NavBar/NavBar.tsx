import React, { FunctionComponent, useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

import { SearchInput } from '../../UI/Search'
import styles from './NavBar.module.scss'
import { DropDown } from '../../UI/DropDown'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'
import { CartContext } from '../../../context/Cart/CartContext'
import { CartContextInterface } from '../../../context/Cart/CartContectInterface'
import { useLogout } from '../../../hooks/Auth/useLogout'
import { CartItem } from '../../../types/CartEntry'

interface Props {
    openSideDrawerHandler: () => void
}

export const NavBar: FunctionComponent<Props> = props => {
    const { items } = useContext<CartContextInterface>(CartContext)

    const { authState, logout } = useLogout()

    const quantity: number = items.reduce(
        (quantity: number, item: CartItem): number => quantity + item.quantity,
        0
    )

    return (
        <header className={[styles.root].join(' ')}>
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
                <WithMediaQuery maxWidth={580}>
                    <ul>
                        {quantity ? (
                            <li className={styles.cartContainer}>
                                <Link className={styles.cart} to='/cart'>
                                    <RiShoppingCartLine />
                                    <span>{quantity}</span>
                                </Link>
                            </li>
                        ) : null}
                        {authState ? (
                            <DropDown label='Profile'>
                                <Link to='/profile'>Profile</Link>
                                <button onClick={logout}>Logout</button>
                            </DropDown>
                        ) : (
                            <li className={styles.signIn}>
                                <Link to='/sign-in'>Sign In</Link>
                            </li>
                        )}
                    </ul>
                </WithMediaQuery>
            </nav>
        </header>
    )
}
