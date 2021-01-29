import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { Product } from '../../../../types/Product'
import styles from './CheckoutProductCard.module.scss'

interface Props {
    product: Product
    quantity: number
}

export const CheckoutProductCard: FunctionComponent<Props> = props => {
    return (
        <li className={styles.root}>
            <img src={GET_FULL_IMAGE_URL(props.product.images[0].url)} alt={props.product.name} />
            {props.quantity > 1 && <span>{props.quantity} x</span>}
            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                {props.product.name}
            </Link>
            <h4>{props.product.price * props.quantity}лв.</h4>
        </li>
    )
}
