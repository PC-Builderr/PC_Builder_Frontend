import React, { useContext, useEffect, useState } from 'react'
import {
    ProductFilterContext,
    ProductFilterContextInterface
} from '../../../../context/ProductFilter'
import { useFetch } from '../../../../hooks/useFetch'
import { Change } from '../../../../types/Events'
import { ChangeHandler } from '../../../../types/Handlers'
import styles from './Filter.module.scss'

interface Props {
    name: string
    url: string
    filter: string

    children: (
        data: any,
        changeHandler: ChangeHandler<HTMLInputElement>
    ) => React.ReactNode[] | React.ReactNode
}

export const Filter: React.FC<Props> = props => {
    const { url } = props

    const { filters, setFilters } = useContext<ProductFilterContextInterface>(ProductFilterContext)

    const changeHandler = (event: Change<HTMLInputElement>) => {
        const value = +event.target.value || event.target.value
        if (filters[props.filter]?.includes(value)) {
            setFilters((currentFilters: any) => {
                const filteredArray: any[] = currentFilters[props.filter].filter(
                    (v: any) => v !== value
                )
                console.log(filteredArray.length)
                return { ...currentFilters, [props.filter]: filteredArray }
            })
            return
        }
        setFilters((currentFilters: any) => {
            if (!currentFilters[props.filter]) return { ...currentFilters, [props.filter]: [value] }
            return { ...currentFilters, [props.filter]: [...currentFilters[props.filter], value] }
        })
    }

    const {
        fetchData,
        state: { data }
    } = useFetch()

    useEffect(() => {
        fetchData(url)
    }, [fetchData, url])

    return (
        <li className={styles.root}>
            <p>{props.name}</p>
            <ul>{props.children(data, changeHandler)}</ul>
        </li>
    )
}
