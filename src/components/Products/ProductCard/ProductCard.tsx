import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Link
} from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { GET_FULL_IMAGE_URL } from '../../../constants'
import { useCart } from '../../../hooks/useCart'
import { Product } from '../../../types/product/Product'
import styles from './ProductCard.module.scss'

interface Props {
    product: Product
}

export const ProductCard: FunctionComponent<Props> = props => {
    const {
        methods: { addItem }
    } = useCart()

    return (
        <Card className={styles.root} variant='outlined'>
            <CardActionArea className={styles.actionArea}>
                <RouterLink to={`/products/${props.product.type}/${props.product.id}`}>
                    <CardMedia
                        component='img'
                        alt={props.product.name}
                        image={GET_FULL_IMAGE_URL(props.product.images[0].url)}
                        title={props.product.name}
                    />
                    <CardContent className={styles.content}>
                        <Link color='primary' variant='body1'>
                            {props.product.name}
                        </Link>
                    </CardContent>
                </RouterLink>
            </CardActionArea>
            <CardActions className={styles.actions}>
                <Grid direction='row' justify='space-between' alignItems='center' container>
                    <Typography variant='h6'>{props.product.price}лв.</Typography>
                    <Button
                        color='primary'
                        size='small'
                        onClick={addItem.bind(null, { id: props.product.id, quantity: 1 })}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    )
}
