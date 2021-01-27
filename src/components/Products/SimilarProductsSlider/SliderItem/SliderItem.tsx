import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { getFullImageUrl } from '../../../../constants'
import { Product } from '../../../../types/Product'
import styles from './SliderItem.module.scss'

interface Props {
    product: Product
}

export const SliderItem: FunctionComponent<Props> = props => {
    return (
        <li className={styles.root}>
            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                <img src={getFullImageUrl(props.product.images[0].url)} alt={props.product.name} />
                <div>
                    <p>{props.product.name}</p>
                    <h4>{props.product.price}лв.</h4>
                </div>
            </Link>
        </li>
    )
}
