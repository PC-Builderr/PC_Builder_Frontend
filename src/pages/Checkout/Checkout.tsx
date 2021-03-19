import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { CheckoutForm } from '../../components/Checkout/CheckoutForm'
import { ShippingAddressCard } from '../../components/Checkout/ShippingAddressCard'
import { CheckoutProductCard } from '../../components/Products/ProductCard/CheckoutProductCard'
import { Header } from '../../components/UI/Header'
import { Input } from '../../components/UI/Input'
import { Label } from '../../components/UI/Label'
import { useFetchEcontCities } from '../../hooks/HTTP/useFetchEcontCities'
import { useFetchShippingPrice } from '../../hooks/HTTP/useFetchShippingPrice'
import { useShippingAddress } from '../../hooks/HTTP/useShippingAddress'
import { useCart } from '../../hooks/useCart'
import { City } from '../../types/econt/City'
import { Change } from '../../types/Events'
import { ShippingAddress } from '../../types/order/ShippingAddress'
import { Product } from '../../types/product/Product'
import styles from './Checkout.module.scss'

interface InputState {
    name: string
    'phone-number': string
    address: string
}

interface SelectState {
    postCode: string
    city: string
}

const promise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? '')

export const Checkout: FunctionComponent = props => {
    const { shippingPrice } = useFetchShippingPrice()
    const { getShippingAddresses, shippingAddresses } = useShippingAddress()

    const [inputState, setInputState] = useState<InputState>({
        name: '',
        'phone-number': '',
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

    const disabled: boolean = useMemo(
        () =>
            !inputState.name ||
            !selectState.city ||
            !inputState['phone-number'] ||
            !inputState.address ||
            !selectState.postCode
                ? true
                : false,

        [inputState, selectState]
    )

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
        console.log(event.target.name, event.target.value)
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

    useEffect(() => {
        getShippingAddresses()
    }, [getShippingAddresses])

    return (
        <div className={styles.root}>
            <Header>Checkout</Header>
            <Label className={styles.shippingAddress} htmlFor='shipping-address'>
                Shipping Address
            </Label>
            <div id='shipping-address'>
                {shippingAddresses?.map((address: ShippingAddress) => (
                    <ShippingAddressCard address={address} />
                ))}
                <Input
                    onChange={inputChangeHandler}
                    value={inputState.name}
                    type='text'
                    label='Name*'
                    name='name'
                />
                <Input
                    onChange={inputChangeHandler}
                    value={inputState['phone-number']}
                    type='tel'
                    label='Phone Number*'
                    name='phone-number'
                    minLength={10}
                    maxLength={10}
                />

                <Label htmlFor='city'>City*</Label>
                <select id='city' onChange={selectChangeHandler}>
                    <option value='' defaultChecked>
                        Choose City
                    </option>
                    {cities.map((city: City) => (
                        <option value={city.id} key={city.id}>
                            {city.name} ({city.postCode})
                        </option>
                    ))}
                </select>

                <Input
                    onChange={inputChangeHandler}
                    value={inputState.address}
                    type='text'
                    label='Address*'
                    name='address'
                />
            </div>
            <section>
                <Elements stripe={promise}>
                    <CheckoutForm
                        name={inputState.name}
                        city={selectState.city}
                        phoneNumber={inputState['phone-number']}
                        address={inputState.address}
                        postCode={selectState.postCode}
                        disabled={disabled}
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
