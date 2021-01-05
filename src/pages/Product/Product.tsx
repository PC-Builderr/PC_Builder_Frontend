import React from 'react'
import styles from './Product.module.scss'

interface Props {}

export const Product: React.FC<Props> = props => {
    return <h1 className={styles.Product}>Product</h1>
}
