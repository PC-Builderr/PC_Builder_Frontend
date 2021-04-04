import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent, StripeCardElementOptions } from '@stripe/stripe-js'
import React, {
    FormEvent,
    FunctionComponent,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../../context/Auth/AuthContext.interface'
import { CartContextInterface } from '../../../context/Cart/CartContectInterface'
import { CartContext } from '../../../context/Cart/CartContext'
import { PrimaryButton } from '../../UI/PrimaryButton/PrimaryButton'
import { Label } from '../../UI/Label'
import styles from './CheckoutForm.module.scss'
import { Card, TextField, Typography } from '@material-ui/core'

interface Props {
    shippingAddressId: number | null
}

interface CreatePaymentIntentResponse {
    clientSecret: string
}

const cardStyle: StripeCardElementOptions = {
    style: {
        base: {
            color: 'rgba(0, 0, 0, 0.87)',
            backgroundColor: 'white',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            iconColor: '#18293c',

            '::placeholder': {
                color: 'rgba(0, 0, 0, 0.57)',
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

export const CheckoutForm: FunctionComponent<Props> = ({ shippingAddressId }) => {
    const stripe = useStripe()
    const elements = useElements()

    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const history = useHistory()

    const { items, setItems } = useContext<CartContextInterface>(CartContext)

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
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify({ items })
            }
        )
        const data: CreatePaymentIntentResponse = await response.json()
        setClientSecret(data.clientSecret)
    }, [items, authState])

    const handleChange = useCallback(async (event: StripeCardElementChangeEvent) => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }, [])

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLDivElement>) => {
            event.preventDefault()

            if (processing || disabled || Boolean(error) || !shippingAddressId) {
                return
            }

            setError(null)

            const element = elements?.getElement(CardElement)
            if (!element) {
                return
            }

            if (!shippingAddressId) {
                return
            }

            setProcessing(true)

            const payload = await stripe!.confirmCardPayment(clientSecret, {
                shipping: {
                    name: 'name',
                    address: { line1: String(shippingAddressId) }
                },
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
            setItems([])
            history.replace('/')
        },
        [
            clientSecret,
            elements,
            stripe,
            setItems,
            disabled,
            error,
            processing,
            history,
            shippingAddressId
        ]
    )

    useEffect(() => {
        getClientSecret()
    }, [getClientSecret])

    return (
        <Card component='form' variant='outlined' className={styles.root} onSubmit={handleSubmit}>
            <CardElement id='card-info' options={cardStyle} onChange={handleChange} />
            {error && (
                <Typography className={styles.error} variant='caption' color='secondary'>
                    {error}
                </Typography>
            )}
            <PrimaryButton loading={processing} type='submit'>
                Pay Now
            </PrimaryButton>
        </Card>
    )
}
