import React, { useState, useEffect, useCallback, FormEvent } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { Button } from '../../components/UI/Button/Button'

const cardStyle = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#32325d'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
}

export default function CheckoutForm() {
    const [succeeded, setSucceeded] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [processing, setProcessing] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [clientSecret, setClientSecret] = useState<string>('')
    const stripe = useStripe()
    const elements = useElements()

    const getClientSecret = useCallback(async () => {
        const response: Response = await fetch(
            `${process.env.REACT_APP_API_URL}/payment/create-payment-intent`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }
        )
        const data = await response.json()

        setClientSecret(data.clientSecret)
    }, [])

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

            setProcessing(false)
            setSucceeded(true)
        },
        [clientSecret, elements, stripe]
    )

    useEffect(() => {
        getClientSecret()
    }, [getClientSecret])

    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <CardElement id='card-element' options={cardStyle} onChange={handleChange} />
            <Button disabled={processing || disabled || succeeded} type='submit'>
                {processing ? 'Processing' : 'Pay'}
            </Button>
            {error && (
                <div className='card-error' role='alert'>
                    {error}
                </div>
            )}
            {succeeded && (
                <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                    Payment succeeded, see the result in your
                    <a href={`https://dashboard.stripe.com/test/payments`}>
                        {' '}
                        Stripe dashboard.
                    </a>{' '}
                    Refresh the page to pay again.
                </p>
            )}
        </form>
    )
}
