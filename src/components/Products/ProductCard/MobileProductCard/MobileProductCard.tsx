import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { Product } from '../../../../types/product/Product'
import styles from './MobileProductCard.module.scss'

interface Props {
    product: Product
}

export const MobileProductCard: FunctionComponent<Props> = props => {
    return (
        <Card variant='outlined'>
            <CardContent className={styles.root}>
                <Link to={`/products/${props.product.type}/${props.product.id}`}>
                    <img
                        src={GET_FULL_IMAGE_URL(props.product.images[0].url)}
                        alt={props.product.name}
                    />
                    <div>
                        <Typography color='primary'>{props.product.name}</Typography>
                        <Typography color='textPrimary' variant='h6'>
                            {props.product.price}лв.
                        </Typography>
                    </div>
                </Link>
            </CardContent>
        </Card>
    )
}
