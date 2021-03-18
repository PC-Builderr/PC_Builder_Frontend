import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiAddCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { useCart } from '../../../../hooks/useCart'
import { CartItem } from '../../../../types/cart/CartEntry'
import { Product } from '../../../../types/product/Product'
import styles from './CartProductCard.module.scss'

interface Props {
    product: Product
    quantity: number
}

export const CartProductCard: FunctionComponent<Props> = props => {
    const {
        methods: { addItem, mutateItem, removeItem }
    } = useCart()

    const decrement = useCallback(() => {
        if (props.quantity === 1) {
            removeItem(props.product.id)
            return
        }

        mutateItem({ id: props.product.id, quantity: props.quantity - 1 })
    }, [removeItem, mutateItem, props.product.id, props.quantity])

    const increment = useCallback(() => {
        addItem({ id: props.product.id, quantity: 1 })
    }, [props.product.id, addItem])

    return (
        <li className={styles.root}>
            <img src={GET_FULL_IMAGE_URL(props.product.images[0].url)} alt={props.product.name} />

            <Link to={`/products/${props.product.type}/${props.product.id}`}>
                {props.product.name}
            </Link>
            <div>
                <h4>{props.product.price}лв.</h4>
                <div>
                    <button onClick={decrement}>
                        <IoMdRemoveCircleOutline />
                    </button>
                    <span>{props.quantity}</span>
                    <button onClick={increment}>
                        <RiAddCircleLine />
                    </button>
                </div>
                <h4>{props.product.price * props.quantity}лв.</h4>
            </div>
        </li>
    )
}
