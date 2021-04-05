import React, { FunctionComponent, useCallback, useState } from 'react'
import { IoMdCart, IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiAddCircleLine } from 'react-icons/ri'
import { GiCheckMark } from 'react-icons/gi'
import styles from './ProductSidebar.module.scss'
import { useCart } from '../../../hooks/useCart'
import { PrimaryButton } from '../../UI/PrimaryButton/PrimaryButton'
import { Card, Divider, IconButton, Typography } from '@material-ui/core'

interface Props {
    price: number
    id: number
}

export const ProductSidebar: FunctionComponent<Props> = props => {
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
        <Card className={styles.root} variant='outlined'>
            <div className={styles.price}>
                <Typography variant='h6'>{price}лв.</Typography>
            </div>
            <Divider />
            <div className={styles.shipping}>
                <GiCheckMark />
                <Typography variant='h6'>Express shipping</Typography>
                <Typography variant='caption' color='textSecondary'>
                    starting from 7.88лв.
                </Typography>
            </div>
            <Divider />
            <div className={styles.action}>
                <div>
                    <Typography variant='subtitle2'>Quantity:</Typography>
                    <IconButton
                        color='inherit'
                        disabled={quantity === 1}
                        onClick={clickHandler.bind(null, -1)}
                    >
                        <IoMdRemoveCircleOutline />
                    </IconButton>
                    <Typography variant='subtitle2'>{quantity}</Typography>
                    <IconButton color='inherit' onClick={clickHandler.bind(null, 1)}>
                        <RiAddCircleLine />
                    </IconButton>
                </div>
                <PrimaryButton onClick={addItem.bind(null, { id, quantity })}>
                    <IoMdCart /> ADD TO CART
                </PrimaryButton>
            </div>
        </Card>
    )
}
