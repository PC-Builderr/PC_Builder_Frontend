import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../../../interfaces/Product'
import styles from './SearchResult.module.scss'

interface Props {
    product: Product
}

export const SearchResult: React.FC<Props> = props => {
    return (
        <li className={styles.root}>
            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                <div>
                    <p>{props.product.name}</p>
                    <h4>{props.product.price}лв.</h4>
                </div>
                <img
                    src={`${process.env.REACT_APP_API_URL}${props.product.images[0].url}`}
                    alt={props.product.name}
                />
            </Link>
        </li>
    )
}
