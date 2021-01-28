import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent, StripeCardElementOptions } from '@stripe/stripe-js'
import React, { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCart } from '../../../hooks/useCart'
import { Button } from '../../UI/Button/Button'
import { Label } from '../../UI/Label'
import styles from './CheckoutForm.module.scss'

const cardStyle: StripeCardElementOptions = {
    style: {
        base: {
            color: '#18293c',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            iconColor: '#18293c',

            '::placeholder': {
                color: '#9ea9b7',
                fontSize: '16px'
            }
        },
        invalid: {
            color: 'red',
            iconColor: 'red'
        }
    },
    hidePostalCode: true
}

export const CheckoutForm: FunctionComponent = () => {
    const stripe = useStripe()
    const elements = useElements()

    const history = useHistory()

    const {
        items,
        methods: { clearCart }
    } = useCart()

    const [error, setError] = useState<string | null>(null)
    const [processing, setProcessing] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [clientSecret, setClientSecret] = useState<string>('')

    const getClientSecret = useCallback(async () => {
        const response: Response = await fetch(
            `${process.env.REACT_APP_API_URL}/payment/create-payment-intent`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items })
            }
        )
        const data = await response.json()

        setClientSecret(data.clientSecret)
    }, [items])

    const handleChange = useCallback(async (event: StripeCardElementChangeEvent) => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }, [])

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            setError(null)

            const element = elements?.getElement(CardElement)
            if (!element) return

            setProcessing(true)

            const payload = await stripe!.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: element
                }
            })

            if (payload.error) {
                setError(`Payment failed ${payload.error.message}`)
                setProcessing(false)
                return
            }
            clearCart()
            setProcessing(false)
            history.push('/')
        },
        [clientSecret, elements, stripe, clearCart, history]
    )

    useEffect(() => {
        getClientSecret()
    }, [getClientSecret])

    return (
        <form className={styles.root} onSubmit={handleSubmit}>
            <Label error={error || ''} htmlFor='card-info'>
                Card Information*
            </Label>
            <CardElement id='card-info' options={cardStyle} onChange={handleChange} />
            {error && <span>{error}</span>}
            <Button
                disabled={processing || disabled || Boolean(error)}
                loading={String(processing)}
                type='submit'
            >
                Pay Now
            </Button>
        </form>
    )
}
