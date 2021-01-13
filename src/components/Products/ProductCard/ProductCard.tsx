import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../../hooks/useCart'
import { Product } from '../../../types/Product'
import styles from './ProductCard.module.scss'

interface Props {
    product: Product
}

export const ProductCard: React.FC<Props> = props => {
    const {
        methods: { addItem }
    } = useCart()

    return (
        <article className={styles.root}>
            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                <img
                    src={process.env.REACT_APP_API_URL + props.product.images[0].url}
                    alt={props.product.name}
                />
                <p>{props.product.name}</p>
            </Link>
            <div>
                <p>{props.product.price}лв.</p>
                <button onClick={addItem.bind(null, { id: props.product.id, quantity: 1 })}>
                    Add To Cart
                </button>
            </div>
        </article>
    )
}
