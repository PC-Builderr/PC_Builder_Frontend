import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../../types/Product'
import styles from './ProductCard.module.scss'

interface Props {
    product: Product
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <article className={styles.root}>
            <Link to={`/products/${product.type}/${product.id}`}>
                <img
                    src={process.env.REACT_APP_API_URL + product.images[0].url}
                    alt={product.name}
                />
                <p>{product.name}</p>
            </Link>
            <div>
                <p>{product.price}лв.</p>
                <button>Add To Cart</button>
            </div>
        </article>
    )
}
