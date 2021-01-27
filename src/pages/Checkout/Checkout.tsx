import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { FunctionComponent } from 'react'
import CheckoutForm from './CheckoutForm'
import styles from './Checkout.module.scss'
import { useCart } from '../../hooks/useCart'
import { Redirect } from 'react-router-dom'

const promise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? '')

export const Checkout: FunctionComponent = props => {
    const { items } = useCart()

    if (!items.length) {
        return <Redirect to='/' />
    }

    return (
        <div className={styles.root}>
            Checkout
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}
