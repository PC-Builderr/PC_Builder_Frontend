import React, { useCallback, useState } from 'react'
import { IoMdCart, IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiAddCircleLine } from 'react-icons/ri'
import { GiCheckMark } from 'react-icons/gi'
import styles from './ProductSidebar.module.scss'
import { useCart } from '../../../hooks/useCart'

interface Props {
    price: number
    id: number
}

export const ProductSidebar: React.FC<Props> = props => {
    const { id, price } = props

    const [quantity, setQuantity] = useState(1)

    const {
        methods: { addItem }
    } = useCart()

    const clickHandler = useCallback(
        (payload: number) => {
            setQuantity((currentQuantity: number) => currentQuantity + payload)
        },
        [setQuantity]
    )

    return (
        <div className={styles.root}>
            <div className={styles.price}>
                <p>{price}лв.</p>
            </div>
            <div className={styles.shipping}>
                <GiCheckMark />
                <span>Express shipping</span>
                <span>starting from 3.99лв.</span>
            </div>
            <div className={styles.action}>
                <div>
                    <span>Quantity:</span>
                    <button disabled={quantity === 1} onClick={clickHandler.bind(null, -1)}>
                        <IoMdRemoveCircleOutline />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={clickHandler.bind(null, 1)}>
                        <RiAddCircleLine />
                    </button>
                </div>
                <button onClick={addItem.bind(null, { id, quantity })}>
                    <IoMdCart /> ADD TO CART
                </button>
            </div>
        </div>
    )
}
