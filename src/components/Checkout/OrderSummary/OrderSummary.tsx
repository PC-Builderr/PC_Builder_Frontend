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
            <Label className={styles.orderLabel} htmlFor='products'>
                Your Order
            </Label>
            <ul id='products' className={styles.root}>
                {products?.map((product: Product) => {
                    return (
                        <CheckoutProductCard
                            key={product.id}
                            quantity={getItemQuantityById(product.id)}
                            product={product}
                        />
                    )
                })}
                <li className={styles.total}>
                    <span>Products Price:</span>
                    <h4>{total}лв.</h4>
                </li>
                <li className={styles.total}>
                    <span>Shipping Price:</span>
                    <h4>{shippingPrice}лв.</h4>
                </li>
                <li className={styles.total}>
                    <span>Total Price:</span>
                    <h4>{total + shippingPrice}лв.</h4>
                </li>
            </ul>
        </>
    )
}
