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
import { CartItem } from '../../../types/cart/CartEntry'
import { AppBar, Badge, Button, Container, IconButton, Typography } from '@material-ui/core'
import { IconRouterLink, RouterLink } from '../../UI/RouterLink'

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
        <AppBar className={styles.root} color='primary' variant='outlined' position='fixed'>
            <Container maxWidth='lg' component='nav'>
                <WithMediaQuery minWidth={1000}>
                    <IconButton className={styles.burger} onClick={props.openSideDrawerHandler}>
                        <HiOutlineMenuAlt2 />
                    </IconButton>
                </WithMediaQuery>
                <WithMediaQuery maxWidth={1000}>
                    <ul>
                        <li>
                            <RouterLink to='/'>Home</RouterLink>
                        </li>
                        <DropDown label='Products'>
                            <Button component={Link} to='/products/cpu'>
                                CPU
                            </Button>
                            <Button component={Link} to='/products/gpu'>
                                Graphics Card
                            </Button>
                            <Button component={Link} to='/products/case'>
                                Case
                            </Button>
                            <Button component={Link} to='/products/motherboard'>
                                Motherboard
                            </Button>
                            <Button component={Link} to='/products/psu'>
                                Power Supply
                            </Button>
                            <Button component={Link} to='/products/ram'>
                                RAM
                            </Button>
                            <Button component={Link} to='/products/storage'>
                                Storage
                            </Button>
                        </DropDown>
                        <li>
                            <RouterLink to='/pc-builder'>Build your PC</RouterLink>
                        </li>
                    </ul>
                </WithMediaQuery>
                <SearchInput />
                <WithMediaQuery maxWidth={580}>
                    <ul>
                        {quantity ? (
                            <li className={styles.cartContainer}>
                                <IconRouterLink to='/cart'>
                                    <Badge badgeContent={quantity} color='secondary'>
                                        <RiShoppingCartLine />
                                    </Badge>
                                </IconRouterLink>
                            </li>
                        ) : null}
                        {authState ? (
                            <DropDown label='Profile'>
                                <Button component={Link} to='/profile'>
                                    Profile
                                </Button>
                                <Button onClick={logout}>Logout</Button>
                            </DropDown>
                        ) : (
                            <li>
                                <RouterLink to='/sign-in'>Sign In</RouterLink>
                            </li>
                        )}
                    </ul>
                </WithMediaQuery>
            </Container>
        </AppBar>
    )
}
