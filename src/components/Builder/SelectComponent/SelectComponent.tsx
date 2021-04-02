import { TextField } from '@material-ui/core'
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { ComponentNames, GET_FULL_COMPONENT_URL } from '../../../constants'
import { useFetchFilteredProducts } from '../../../hooks/HTTP/useFetchFilteredProducts'
import { useIsMounted } from '../../../hooks/useIsMounted'
import { Component } from '../../../types/components/Component'
import { Product } from '../../../types/product/Product'
import styles from './SelectComponent.module.scss'

interface Props {
    type: string
    setComponent: React.Dispatch<React.SetStateAction<any>>
    filters: any
    id: string
    component: Component | null
}

export const SelectComponent: FunctionComponent<Props> = props => {
    const { setComponent, type, id, filters } = props

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const {
        state: { products, error, loading },
        methods: { setFilters }
    } = useFetchFilteredProducts(props.type)

    useEffect(() => {
        setFilters(filters)
    }, [filters, setFilters])

    useEffect(() => {
        if (error) {
            alert(`Whith your current config there are no maching ${type} components`)
        }
    }, [error, type])

    const changeHandler = useCallback(
        async (
            event: React.ChangeEvent<{}>,
            value: Product | null,
            reason: AutocompleteChangeReason,
            details?: AutocompleteChangeDetails<Product> | undefined
        ) => {
            if (!value) {
                setComponent(null)
                return
            }

            const response = await fetch(GET_FULL_COMPONENT_URL(type, String(value.id)))

            const data = await response.json()

            if (!isMounted.current) return

            if (!response.ok) {
                setComponent(null)
                return
            }
            setComponent(data.component)
        },
        [isMounted, setComponent, type]
    )

    return (
        <div className={styles.root}>
            <Autocomplete
                id={id}
                options={products ?? []}
                getOptionLabel={option => option.name}
                loading={loading}
                value={props.component?.product ?? null}
                onChange={changeHandler}
                getOptionSelected={(option: Product, value: Product) => option.id === value.id}
                renderInput={params => (
                    <TextField {...params} label={ComponentNames.get(type)} variant='outlined' />
                )}
            />
        </div>
    )
}
