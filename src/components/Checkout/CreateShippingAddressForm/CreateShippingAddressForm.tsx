import React, { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useFetchEcontCities } from '../../../hooks/HTTP/useFetchEcontCities'
import { City } from '../../../types/econt/City'
import { Change } from '../../../types/Events'
import { CreateShippingAddressDto } from '../../../types/order/CreateShippingAddressDto'
import { Button } from '../../UI/Button/Button'
import { Input } from '../../UI/Input'
import { Label } from '../../UI/Label'
import styles from './CreateShippingAddressForm.module.scss'

interface Props {
    onSubmit: (createShippingAddressDto: CreateShippingAddressDto) => Promise<void>
}

interface InputState {
    name: string
    'phone-number': string
    address: string
}

interface SelectState {
    postCode: string
    city: string
}

export const CreateShippingAddressForm: FunctionComponent<Props> = props => {
    const [inputState, setInputState] = useState<InputState>({
        name: '',
        'phone-number': '',
        address: ''
    })

    const [selectState, setSelectState] = useState<SelectState>({
        city: '',
        postCode: ''
    })

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

    return (
        <form
            className={styles.root}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault()

                props.onSubmit({
                    address: inputState['address'],
                    city: selectState['city'],
                    name: inputState['name'],
                    phone: inputState['phone-number'],
                    postCode: selectState['postCode']
                })
            }}
        >
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
            <Button disabled={disabled} type='submit'>
                Save Address
            </Button>
        </form>
    )
}
