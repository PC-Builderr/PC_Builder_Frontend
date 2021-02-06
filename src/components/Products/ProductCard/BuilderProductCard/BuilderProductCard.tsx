import React, { FunctionComponent } from 'react'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { Product } from '../../../../types/product/Product'
import styles from './BuilderProductCard.module.scss'

interface Props {
    product: Product
}

export const BuilderProductCard: FunctionComponent<Props> = props => {
    return (
        <button className={styles.root}>
            <img src={GET_FULL_IMAGE_URL(props.product.images[0].url)} alt={props.product.name} />
            <div>
                <p>{props.product.name}</p>
                <h3>{props.product.price}лв.</h3>
            </div>
        </button>
    )
}
