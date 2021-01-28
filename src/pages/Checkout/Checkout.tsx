import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { CheckoutForm } from '../../components/Checkout/CheckoutForm'
import { CheckoutProductCard } from '../../components/Products/ProductCard/CheckoutProductCard'
import { Input } from '../../components/UI/Input'
import { Label } from '../../components/UI/Label'
import { PRODUCTS_API_URL } from '../../constants'
import { useCart } from '../../hooks/useCart'
import { CartItem } from '../../types/CartEntry'
import { Product } from '../../types/Product'
import styles from './Checkout.module.scss'

const promise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? '')

export const Checkout: FunctionComponent = props => {
    const { items } = useCart()

    const [products, setProducts] = useState<Product[] | null>(null)
    const [error, setError] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)

    const fetchData = useCallback(async () => {
        if (!items.length) return

        setError(false)

        const response = await fetch(
            `${PRODUCTS_API_URL}/ids?${items.reduce(
                (query: string, item: CartItem): string => `${query}${query && '&'}ids=${item.id}`,
                ''
            )}`
        )

        const resData = await response.json()

        if (!response.ok) {
            setProducts(null)
            setError(true)
            return
        }

        setProducts(resData.products)

        const cost: number = items.reduce((cost: number, item: CartItem): number => {
            const product: Product = resData.products.find(
                (product: Product) => product.id === item.id
            )

            return cost + product.price * item.quantity
        }, 0)

        setTotal(cost)
    }, [items])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={styles.root}>
            <h2>Checkout</h2>
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
            <Label className={styles.shippingAddress} htmlFor='shipping-address'>
                Shipping Address
            </Label>
            <div id='shipping-address'>
                <Input type='text' label='First Name*' name='first-name' />
                <Input type='text' label='Last Name*' name='last-name' />
                <Input type='text' label='Phone Number*' name='phone-number' />
                <Input type='text' label='City*' name='city' />
                <Input type='text' label='Address*' name='address' />
            </div>
            <Label className={styles.orderLabel} htmlFor='products'>
                Your Order
            </Label>
            <ul id='products'>
                {products?.map((product: Product) => {
                    const item: CartItem | null =
                        items.find((item: CartItem) => item.id === product.id) ?? null
                    return (
                        <CheckoutProductCard
                            key={product.id}
                            quantity={item?.quantity || 0}
                            product={product}
                        />
                    )
                })}
                <li className={styles.total}>
                    <span>Total Price:</span>
                    <h4>{total}лв.</h4>
                </li>
            </ul>
        </div>
    )
}
