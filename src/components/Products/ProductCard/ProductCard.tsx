import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../constants'
import { useCart } from '../../../hooks/useCart'
import { Product } from '../../../types/product/Product'
import styles from './ProductCard.module.scss'

interface Props {
    product: Product
}

export const ProductCard: FunctionComponent<Props> = props => {
    const {
        methods: { addItem }
    } = useCart()

    return (
        <article className={styles.root}>
            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                <img
                    src={GET_FULL_IMAGE_URL(props.product.images[0].url)}
                    alt={props.product.name}
                />
                <p>{props.product.name}</p>
            </Link>
            <div>
                <h3>{props.product.price}лв.</h3>
                <button onClick={addItem.bind(null, { id: props.product.id, quantity: 1 })}>
                    Add To Cart
                </button>
            </div>
        </article>
    )
}
