import { Card, CardContent, CardMedia, Grid, Typography, Link } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { Product } from '../../../../types/product/Product'
import styles from './CheckoutProductCard.module.scss'

interface Props {
    product: Product
    quantity: number
}

export const CheckoutProductCard: FunctionComponent<Props> = props => {
    return (
        <Card className={styles.root} variant='outlined'>
            <CardMedia
                component='img'
                image={GET_FULL_IMAGE_URL(props.product.images[0].url)}
                alt={props.product.name}
            />
            <CardContent>
                {props.quantity > 1 && <Typography variant='body2'>{props.quantity} x</Typography>}
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
                <h4>{props.product.price * props.quantity}лв.</h4>
            </CardContent>
        </Card>
    )
}
