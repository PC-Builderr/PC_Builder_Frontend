import { Card, Divider, Typography } from '@material-ui/core'
import React, { FunctionComponent, useCallback, useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../../context/Auth/AuthContext.interface'
import { PrimaryButton } from '../../UI/PrimaryButton/PrimaryButton'
import styles from './CartSideBar.module.scss'

interface Props {
    price: number
    disabled: boolean
}

export const CartSideBar: FunctionComponent<Props> = props => {
    const history = useHistory()
    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const routeingHandler = useCallback(() => {
        if (props.disabled) {
            return
        }

        if (!authState) {
            history.push('/sign-in?to=/checkout')
            return
        }

        history.push('/checkout')
    }, [history, authState, props.disabled])

    return (
        <Card className={styles.root} variant='outlined'>
            <div className={styles.price}>
                <Typography variant='h6'>{props.price}лв.</Typography>
            </div>
            <Divider />
            <div className={styles.action}>
                <PrimaryButton onClick={routeingHandler}>checkout</PrimaryButton>
            </div>
        </Card>
    )
}
