import React, { FunctionComponent, useCallback, useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../../context/Auth/AuthContext.interface'
import { Button } from '../../UI/Button/Button'
import styles from './CartSideBar.module.scss'

interface Props {
    price: number
    disabled: boolean
}

export const CartSideBar: FunctionComponent<Props> = props => {
    const history = useHistory()
    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const routeingHandler = useCallback(() => {
        if (!authState) {
            history.push('/sign-in')
            return
        }

        history.push('/checkout')
    }, [history, authState])

    return (
        <div className={styles.root}>
            <div className={styles.price}>
                <p>{props.price}лв.</p>
            </div>
            <div className={styles.action}>
                <Button disabled={props.disabled} onClick={routeingHandler}>
                    CHECKOUT
                </Button>
            </div>
        </div>
    )
}
