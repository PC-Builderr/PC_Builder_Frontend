import {
    Card,
    CardContent,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'
import { useLogout } from '../../../hooks/Auth/useLogout'
import { useCart } from '../../../hooks/useCart'
import styles from './SideDrawer.module.scss'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const SideDrawer: FunctionComponent<Props> = props => {
    const { authState, logout } = useLogout()

    const { items } = useCart()

    return (
        <>
            <Drawer open={props.isOpen} anchor='left' onClose={props.onClose}>
                <div className={styles.root}>
                    <div>
                        <Typography variant='h6' color='primary' component={Link} to='/'>
                            PC Builder
                        </Typography>
                        <IconButton onClick={props.onClose}>
                            <VscChromeClose className={styles.close} />
                        </IconButton>
                    </div>
                    <Typography color='textSecondary' variant='caption'>
                        Services
                    </Typography>
                    <Card variant='outlined'>
                        <ListItem component={Link} to='/pc-builder' button>
                            <ListItemText primary='Build your PC' />
                        </ListItem>
                    </Card>
                    <Typography color='textSecondary' variant='caption'>
                        Products
                    </Typography>
                    <Card variant='outlined'>
                        <ListItem component={Link} to='/products/cpu' button>
                            <ListItemText primary='CPU' />
                        </ListItem>
                        <ListItem component={Link} to='/products/gpu' button>
                            <ListItemText primary='Graphics Card' />
                        </ListItem>
                        <ListItem component={Link} to='/products/case' button>
                            <ListItemText primary='Case' />
                        </ListItem>
                        <ListItem component={Link} to='/products/motherboard' button>
                            <ListItemText primary='Motherboard' />
                        </ListItem>
                        <ListItem component={Link} to='/products/psu' button>
                            <ListItemText primary='Power Supply' />
                        </ListItem>
                        <ListItem component={Link} to='/products/ram' button>
                            <ListItemText primary='RAM' />
                        </ListItem>
                        <ListItem component={Link} to='/products/storage' button>
                            <ListItemText primary='Storage' />
                        </ListItem>
                    </Card>

                    <WithMediaQuery minWidth={580}>
                        <>
                            <Typography color='textSecondary' variant='caption'>
                                Profile
                            </Typography>
                            <Card variant='outlined'>
                                {authState?.userId ? (
                                    <>
                                        <ListItem component={Link} to='/profile' button>
                                            <ListItemText primary='Profile' />
                                        </ListItem>
                                        <ListItem onClick={logout} button>
                                            <ListItemText primary='Logout' />
                                        </ListItem>
                                    </>
                                ) : (
                                    <ListItem component={Link} to='/sign-in' button>
                                        <ListItemText primary='Sign in' />
                                    </ListItem>
                                )}
                            </Card>
                            {items.length ? (
                                <>
                                    <Typography color='textSecondary' variant='caption'>
                                        Cart
                                    </Typography>
                                    <Card variant='outlined'>
                                        <ListItem component={Link} to='/cart' button>
                                            <ListItemText primary='Cart' />
                                        </ListItem>
                                    </Card>
                                </>
                            ) : null}
                        </>
                    </WithMediaQuery>
                </div>
            </Drawer>
        </>
    )
}
