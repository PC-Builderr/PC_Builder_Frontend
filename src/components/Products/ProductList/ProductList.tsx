import React, { FunctionComponent } from 'react'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'
import { Product } from '../../../types/product/Product'
import { ProductCard } from '../ProductCard'
import { MobileProductCard } from '../ProductCard/MobileProductCard'
import styles from './ProductList.module.scss'

interface Props {
    products: Product[]
}

export const ProductList: FunctionComponent<Props> = props => {
    return (
        <ul className={styles.root}>
            {props.products.map((product: Product) => (
                <li key={product.id}>
                    <WithMediaQuery maxWidth={540}>
                        <ProductCard product={product} />
                    </WithMediaQuery>
                    <WithMediaQuery minWidth={540}>
                        <MobileProductCard product={product} />
                    </WithMediaQuery>
                </li>
            ))}
        </ul>
    )
}
