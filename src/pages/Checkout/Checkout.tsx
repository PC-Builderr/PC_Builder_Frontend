import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { CheckoutForm } from '../../components/Checkout/CheckoutForm'
import { CheckoutProductCard } from '../../components/Products/ProductCard/CheckoutProductCard'
import { Header } from '../../components/UI/Header'
import { Input } from '../../components/UI/Input'
import { Label } from '../../components/UI/Label'
import { useFetchEcontCities } from '../../hooks/HTTP/useFetchEcontCities'
import { useCart } from '../../hooks/useCart'
import { City } from '../../types/econt/City'
import { Change } from '../../types/Events'
import { Product } from '../../types/product/Product'
import styles from './Checkout.module.scss'

interface InputState {
    name: string
    'phome-number': string
    address: string
}

interface SelectState {
    postCode: string
    city: string
}

const promise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? '')

export const Checkout: FunctionComponent = props => {
    const [shippingPrice, setShippingPrice] = useState<number>(0)

    const [inputState, setInputState] = useState<InputState>({
        name: '',
        'phome-number': '',
        address: ''
    })

    const [selectState, setSelectState] = useState<SelectState>({
        city: '',
        postCode: ''
    })

    const {
        data: { products, total },
        methods: { populateData, getItemQuantityById }
    } = useCart()

    const { cities } = useFetchEcontCities()

    const selectChangeHandler = useCallback(
        (event: Change<HTMLSelectElement>) => {
            if (!event.target.value) {
                setSelectState({ city: '', postCode: '' })
                return
            }
            const city: City | null =
                cities?.find((city: City) => city.id === Number(event.target.value)) ?? null
            if (!city) {
                setSelectState({ city: '', postCode: '' })
                return
            }
            setSelectState({
                city: city.name,
                postCode: city.postCode
            })
        },
        [cities]
    )

    const inputChangeHandler = useCallback((event: Change<HTMLInputElement>) => {
        setInputState((prevState: InputState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }, [])

    useEffect(() => {
        populateData()
    }, [populateData])

    return (
        <div className={styles.root}>
            <Header>Checkout</Header>
            <Label className={styles.shippingAddress} htmlFor='shipping-address'>
                Shipping Address
            </Label>
            <div id='shipping-address'>
                <Input onChange={inputChangeHandler} type='text' label='Name*' name='name' />
                <Input
                    onChange={inputChangeHandler}
                    type='tel'
                    label='Phone Number*'
                    name='phone-number'
                    minLength={10}
                    maxLength={10}
                />

                <Label htmlFor='city'>City*</Label>
                <select id='city' onChange={selectChangeHandler}>
                    <option value='' defaultChecked>
                        Choose Component
                    </option>
                    {cities.map((city: City) => (
                        <option value={city.id} key={city.id}>
                            {city.name} ({city.postCode})
                        </option>
                    ))}
                </select>

                <Input onChange={inputChangeHandler} type='text' label='Address*' name='address' />
            </div>
            <section>
                <Elements stripe={promise}>
                    <CheckoutForm
                        name={inputState.name}
                        city={selectState.city}
                        phoneNumber={inputState['phome-number']}
                        address={inputState.address}
                        postCode={selectState.postCode}
                        setShippingPrice={setShippingPrice}
                    />
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
