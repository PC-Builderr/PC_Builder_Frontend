import React from 'react'
import styles from './Cart.module.scss'

interface Props {}

export const Cart: React.FC<Props> = props => {
    return (
        <div className={styles.root}>
            <h1>Cart</h1>
        </div>
    )
}
