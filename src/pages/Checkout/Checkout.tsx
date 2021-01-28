import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { FunctionComponent } from 'react'
import { CheckoutForm } from '../../components/Checkout/CheckoutForm'
import styles from './Checkout.module.scss'

const promise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? '')

export const Checkout: FunctionComponent = props => {
    return (
        <div className={styles.root}>
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}
