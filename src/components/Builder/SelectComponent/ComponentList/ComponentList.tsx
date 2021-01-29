import React, { FunctionComponent, useEffect } from 'react'
import { useFetchFilteredProducts } from '../../../../hooks/HTTP/useFetchFilteredProducts'
import { Product } from '../../../../types/Product'
import { BuilderProductCard } from '../../../Products/ProductCard/BuilderProductCard'
import styles from './ComponentList.module.scss'

interface Props {
    type: string
}

export const ComponentList: FunctionComponent<Props> = props => {
    const { type } = props

    const {
        state: { products }
    } = useFetchFilteredProducts(type)

    return (
        <ul className={styles.root}>
            {products?.map((product: Product) => (
                <li key={product.id}>
                    <BuilderProductCard product={product} />
                </li>
            ))}
        </ul>
    )
}
