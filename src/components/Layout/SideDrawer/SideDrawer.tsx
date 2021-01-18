import React from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'
import { useLogout } from '../../../hooks/Auth/useLogout'
import styles from './SideDrawer.module.scss'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const SideDrawer: React.FC<Props> = props => {
    const { authState, logout } = useLogout()

    return (
        <>
            <aside className={props.isOpen ? styles.root : [styles.root, styles.open].join(' ')}>
                <button onClick={props.onClose}>
                    <VscChromeClose />
                </button>
                <Link to='/'>PC Builder</Link>

                <label htmlFor='services'>Services</label>
                <ul id='services'>
                    <li>
                        <Link to='/pc-builder'>Build your PC</Link>
                    </li>
                </ul>
                <label htmlFor='products'>Products</label>
                <ul id='products'>
                    <li>
                        <Link to='/products/cpu'>CPU</Link>
                    </li>
                    <li>
                        <Link to='/products/gpu'>Graphics Card</Link>
                    </li>
                    <li>
                        <Link to='/products/case'>Case</Link>
                    </li>
                    <li>
                        <Link to='/products/motherboard'>Motherboard</Link>
                    </li>
                    <li>
                        <Link to='/products/psu'>Power Supply</Link>
                    </li>
                    <li>
                        <Link to='/products/ram'>RAM</Link>
                    </li>
                    <li>
                        <Link to='/products/storage'>Storage</Link>
                    </li>
                </ul>
                <WithMediaQuery minWidth={550}>
                    <>
                        <label htmlFor='profile'>Profile</label>
                        <ul id='profile'>
                            {authState?.userId ? (
                                <>
                                    <li>
                                        <Link to='/profile'>Profile</Link>
                                    </li>
                                    <li>
                                        <button onClick={logout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to='/sign-in'>Sign In</Link>
                                </li>
                            )}
                        </ul>
                        <label htmlFor='cart'>Cart</label>
                        <ul id='cart'>
                            <li>
                                <Link to='/cart'>Cart</Link>
                            </li>
                        </ul>
                    </>
                </WithMediaQuery>
            </aside>
        </>
    )
}
