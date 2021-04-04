import { TextField } from '@material-ui/core'
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab'
import React, { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useFetchEcontCities } from '../../../hooks/HTTP/useFetchEcontCities'
import { City } from '../../../types/econt/City'
import { Change } from '../../../types/Events'
import { CreateShippingAddressDto } from '../../../types/order/CreateShippingAddressDto'
import { PrimaryButton } from '../../UI/PrimaryButton/PrimaryButton'
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
        (
            event: React.ChangeEvent<{}>,
            value: City | null,
            reason: AutocompleteChangeReason,
            details?: AutocompleteChangeDetails<City> | undefined
        ) => {
            if (!value) {
                setSelectState({ city: '', postCode: '' })
                return
            }

            setSelectState({
                city: value.name,
                postCode: value.postCode
            })
        },
        []
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

                if (disabled) {
                    return
                }

                props.onSubmit({
                    address: inputState['address'],
                    city: selectState['city'],
                    name: inputState['name'],
                    phone: inputState['phone-number'],
                    postCode: selectState['postCode']
                })
            }}
        >
            <TextField
                onChange={inputChangeHandler}
                value={inputState.name}
                type='text'
                label='Name'
                name='name'
                fullWidth
                variant='outlined'
                className={styles.Input}
            />
            <TextField
                onChange={inputChangeHandler}
                value={inputState['phone-number']}
                type='tel'
                label='Phone Number'
                name='phone-number'
                fullWidth
                variant='outlined'
                className={styles.Input}
            />
            <Autocomplete
                id='city'
                options={cities}
                getOptionLabel={option => `${option.name} (${option.postCode})`}
                onChange={selectChangeHandler}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Choose City'
                        variant='outlined'
                        className={styles.Input}
                    />
                )}
            />

            <TextField
                onChange={inputChangeHandler}
                value={inputState.address}
                type='text'
                label='Address'
                name='address'
                fullWidth
                variant='outlined'
                className={styles.Input}
            />
            <PrimaryButton type='submit'>Save Address</PrimaryButton>
        </form>
    )
}
