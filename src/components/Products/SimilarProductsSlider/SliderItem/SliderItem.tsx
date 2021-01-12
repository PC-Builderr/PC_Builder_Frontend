import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../../../types/Product'
import styles from './SliderItem.module.scss'

interface Props {
    product: Product
    scroll: number
}

export const SliderItem: React.FC<Props> = props => {
    return (
        <li
            className={styles.root}
            style={{
                transform: `translate(${props.scroll}px)`
            }}
        >
            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                <img
                    src={`${process.env.REACT_APP_API_URL}${props.product.images[0].url}`}
                    alt={props.product.name}
                />
                <div>
                    <p>{props.product.name}</p>
                    <h4>{props.product.price}лв.</h4>
                </div>
            </Link>
        </li>
    )
}
