import { Card, Divider, Typography } from '@material-ui/core'
import React, { FunctionComponent, useEffect } from 'react'
import { useFetchShippingPrice } from '../../../hooks/HTTP/useFetchShippingPrice'
import { useCart } from '../../../hooks/useCart'
import { Product } from '../../../types/product/Product'
import { CheckoutProductCard } from '../../Products/ProductCard/CheckoutProductCard'
import { Label } from '../../UI/Label'
import styles from './OrderSummary.module.scss'

interface Props {}

export const OrderSummary: FunctionComponent<Props> = props => {
    const { shippingPrice } = useFetchShippingPrice()

    const {
        data: { products, total },
        methods: { populateData, getItemQuantityById }
    } = useCart()

    useEffect(() => {
        populateData()
    }, [populateData])

    return (
        <>
            <Typography className={styles.orderLabel} variant='subtitle2' color='textSecondary'>
                Your Order
            </Typography>

            <Card className={styles.root} variant='outlined'>
                {products?.map((product: Product) => {
                    return (
                        <>
                            <CheckoutProductCard
                                key={product.id}
                                quantity={getItemQuantityById(product.id)}
                                product={product}
                            />
                            <Divider />
                        </>
                    )
                })}
                <li className={styles.total}>
                    <Typography variant='body2'>Products Price:</Typography>
                    <h4>{total}лв.</h4>
                </li>
                <Divider />
                <li className={styles.total}>
                    <Typography variant='body2'>Shipping Price:</Typography>
                    <h4>{shippingPrice}лв.</h4>
                </li>
                <Divider />
                <li className={styles.total}>
                    <Typography variant='body2'>Total Price:</Typography>
                    <h4>{total + shippingPrice}лв.</h4>
                </li>
            </Card>
        </>
    )
}
