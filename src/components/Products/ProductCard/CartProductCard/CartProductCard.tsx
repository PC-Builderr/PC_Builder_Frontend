import { Card, CardActions, CardMedia, Grid, IconButton, Link, Typography } from '@material-ui/core'
import React, { FunctionComponent, useCallback } from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiAddCircleLine } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { useCart } from '../../../../hooks/useCart'
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
        <Card className={styles.root} variant='outlined'>
            <div className={styles.main}>
                <CardMedia
                    component='img'
                    image={GET_FULL_IMAGE_URL(props.product.images[0].url)}
                    alt={props.product.name}
                />

                {props.product.type === 'computer' ? (
                    <Typography variant='subtitle2' className={styles.computer}>
                        {props.product.name}
                    </Typography>
                ) : (
                    <Link
                        component={RouterLink}
                        to={`/products/${props.product.type}/${props.product.id}`}
                        variant='body2'
                    >
                        {props.product.name}
                    </Link>
                )}
            </div>
            <CardActions className={styles.actionArea}>
                <Typography variant='h6'>{props.product.price}лв.</Typography>
                <div>
                    <IconButton color='inherit' onClick={decrement}>
                        <IoMdRemoveCircleOutline />
                    </IconButton>
                    <Typography variant='subtitle2'>{props.quantity}</Typography>
                    <IconButton color='inherit' onClick={increment}>
                        <RiAddCircleLine />
                    </IconButton>
                </div>
                <Typography variant='h6'>{props.product.price * props.quantity}лв.</Typography>
            </CardActions>
        </Card>
    )
}
