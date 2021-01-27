import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { FunctionComponent } from 'react'
import CheckoutForm from './CheckoutForm'
import styles from './Checkout.module.scss'

const promise: Promise<Stripe | null> = loadStripe(
    'pk_test_51IDzvXLItdnTKPnLxoHEJu1RG5oJ8Z0bv22oFujCg9dZmJcP8yolTRp9B2vwCoiDDXWRUH3YlQJWws3jrk8RN6QN004zT80y2f'
)

export const Checkout: FunctionComponent = props => {
    return (
        <div className={styles.root}>
            Checkout
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}
