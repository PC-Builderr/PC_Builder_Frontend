import React from 'react'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'
import { Product } from '../../../types/Product'
import { SearchResult } from '../../UI/Search/SearchResult'
import { ProductCard } from '../ProductCard'
import { MobileProductCard } from '../ProductCard/MobileProductCart'
import styles from './ProductList.module.scss'

interface Props {
    products: Product[]
}

export const ProductList: React.FC<Props> = props => {
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
