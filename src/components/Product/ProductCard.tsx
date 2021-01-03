import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Product } from '../../interfaces/Product'

interface Props {
    product: Product
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '16.5rem',
            minHeight: '20.75rem',
            display: 'inline-block'
        },
        image: {
            padding: '5%',
            boxSizing: 'border-box'
        },
        content: {
            minHeight: '5.5rem',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center'
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 1rem'
        },

        price: {
            color: '#172F4E',
            marginRight: '1rem'
        }
    })
)

export const ProductCard: React.FC<Props> = ({ product }) => {
    const styles = useStyles()

    const history = useHistory()

    return (
        <Card className={styles.root} variant='outlined'>
            <CardActionArea onClick={() => history.push(`${product.type}/${product.id}`)}>
                <CardMedia
                    className={styles.image}
                    component='img'
                    alt={product.name}
                    title={product.name}
                    src={process.env.REACT_APP_API_URL + product.images[0].url}
                />
                <CardContent className={styles.content}>
                    <Typography variant='h6' color='primary'>
                        {product.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div className={styles.actions}>
                <Typography variant='h5' className={styles.price}>
                    {product.price}лв.
                </Typography>
                <Button color='primary'>add to cart</Button>
            </div>
        </Card>
    )
}
