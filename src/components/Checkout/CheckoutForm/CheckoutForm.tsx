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
import { Button } from '../../UI/Button/Button'
import { Label } from '../../UI/Label'
import styles from './CheckoutForm.module.scss'

interface Props {
    phoneNumber: string
    name: string
    address: string
    postCode: string
    city: string
    disabled: boolean
}

interface CreatePaymentIntentResponse {
    clientSecret: string
}

const cardStyle: StripeCardElementOptions = {
    style: {
        base: {
            color: '#18293c',
            backgroundColor: 'white',
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

export const CheckoutForm: FunctionComponent<Props> = props => {
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
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            setError(null)

            const element = elements?.getElement(CardElement)
            if (!element) return

            setProcessing(true)

            const payload = await stripe!.confirmCardPayment(clientSecret, {
                shipping: {
                    phone: props.phoneNumber,
                    name: props.name,
                    carrier: 'Econt',
                    address: {
                        country: 'BGR',
                        line1: props.address,
                        city: props.city,
                        postal_code: props.postCode
                    }
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
        [clientSecret, elements, stripe, setItems, history, props]
    )

    useEffect(() => {
        getClientSecret()
    }, [getClientSecret])

    return (
        <form className={styles.root} onSubmit={handleSubmit}>
            <Label error={error || undefined} htmlFor='card-info'>
                Card Information*
            </Label>
            <CardElement id='card-info' options={cardStyle} onChange={handleChange} />
            {error && <span>{error}</span>}
            <Button
                disabled={processing || disabled || Boolean(error) || props.disabled}
                loading={String(processing)}
                type='submit'
            >
                Pay Now
            </Button>
        </form>
    )
}
