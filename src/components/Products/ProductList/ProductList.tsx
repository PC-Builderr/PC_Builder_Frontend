import React from 'react'
import { Product } from '../../../types/Product'
import { ProductCard } from '../ProductCard'
import styles from './ProductList.module.scss'

interface Props {
    products: Product[]
}

export const ProductList: React.FC<Props> = props => {
    return (
        <ul className={styles.root}>
            {props.products.map((product: Product) => {
                return (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                )
            })}
        </ul>
    )
}
