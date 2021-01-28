import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './Cart.module.scss'

export const Cart: FunctionComponent = () => {
    return (
        <div className={styles.root}>
            <h3>Cart</h3>

            <Link to='/checkout'>Checkout</Link>
        </div>
    )
}
