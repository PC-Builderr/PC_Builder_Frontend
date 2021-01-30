import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { CheckoutForm } from '../../components/Checkout/CheckoutForm'
import { CheckoutProductCard } from '../../components/Products/ProductCard/CheckoutProductCard'
import { Input } from '../../components/UI/Input'
import { Label } from '../../components/UI/Label'
import { useCart } from '../../hooks/useCart'
import { Product } from '../../types/product/Product'
import styles from './Checkout.module.scss'

const promise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? '')

export const Checkout: FunctionComponent = props => {
    const [shippingPrice, setShippingPrice] = useState<number>(0)

    const {
        data: { products, total },
        methods: { populateData, getItemQuantityById }
    } = useCart()

    useEffect(() => {
        populateData()
    }, [populateData])

    return (
        <div className={styles.root}>
            <h2>Checkout</h2>

            <Label className={styles.shippingAddress} htmlFor='shipping-address'>
                Shipping Address
            </Label>
            <div id='shipping-address'>
                <Input type='text' label='First Name*' name='first-name' />
                <Input type='text' label='Last Name*' name='last-name' />
                <Input
                    type='tel'
                    label='Phone Number*'
                    name='phone-number'
                    minLength={10}
                    maxLength={10}
                />
                <Input type='select' label='City*' name='city' list='cityname' autoComplete='on' />
                <datalist id='cityname'>
                    <option color='red' value='Boston' />
                    <option value='Cambridge' />
                </datalist>
                <Input type='text' label='Address*' name='address' />
                <Label htmlFor='additional-info'>Additional Information</Label>
                <textarea id='additional-info'></textarea>
            </div>
            <section>
                <Elements stripe={promise}>
                    <CheckoutForm setShippingPrice={setShippingPrice} />
                </Elements>
                <Label className={styles.orderLabel} htmlFor='products'>
                    Your Order
                </Label>
                <ul id='products'>
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
            </section>
        </div>
    )
}
