import React, { useCallback, useState } from 'react'
import { IoMdCart, IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiAddCircleLine } from 'react-icons/ri'
import { GiCheckMark } from 'react-icons/gi'
import styles from './ProductSidebar.module.scss'

interface Props {
    price: number
}

export const ProductSidebar: React.FC<Props> = props => {
    const [quantity, setQuantity] = useState(1)

    const clickHandler = useCallback(
        (payload: number) => {
            setQuantity((currentQuantity: number) => {
                return currentQuantity + payload
            })
        },
        [setQuantity]
    )

    return (
        <div className={styles.root}>
            <div className={styles.price}>
                <p>{props.price}лв.</p>
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
                <button>
                    <IoMdCart /> ADD TO CART
                </button>
            </div>
        </div>
    )
}
