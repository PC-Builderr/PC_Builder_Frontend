import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { Product } from '../../../../types/product/Product'
import styles from './MobileProductCard.module.scss'

interface Props {
    product: Product
}

export const MobileProductCard: FunctionComponent<Props> = props => {
    return (
        <article className={styles.root}>
            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                <img
                    src={GET_FULL_IMAGE_URL(props.product.images[0].url)}
                    alt={props.product.name}
                />
                <div>
                    <p>{props.product.name}</p>
                    <h3>{props.product.price}лв.</h3>
                </div>
            </Link>
        </article>
    )
}
