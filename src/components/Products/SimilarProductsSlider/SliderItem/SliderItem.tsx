import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../../constants'
import { Product } from '../../../../types/product/Product'
import styles from './SliderItem.module.scss'

interface Props {
    product: Product
}

export const SliderItem: FunctionComponent<Props> = props => {
    return (
        <Card className={styles.root} variant='outlined'>
            <CardActionArea>
                <Link to={`/products/${props.product.type}/${props.product.id}`}>
                    <CardMedia
                        component='img'
                        image={GET_FULL_IMAGE_URL(props.product.images[0].url)}
                        alt={props.product.name}
                    />

                    <CardContent className={styles.content}>
                        <Grid direction='column' justify='space-between' container>
                            <Typography variant='body2' color='primary'>
                                {props.product.name}
                            </Typography>
                            <Typography variant='h6' color='textPrimary'>
                                {props.product.price}лв.
                            </Typography>
                        </Grid>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    )
}
