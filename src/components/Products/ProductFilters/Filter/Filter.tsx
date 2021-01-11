import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { Change } from '../../../../types/Events'
import { ChangeHandler } from '../../../../types/Handlers'
import styles from './Filter.module.scss'

interface Props {
    name: string
    url: string
    filter: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>

    children: (
        data: any,
        values: any,
        changeHandler: ChangeHandler<HTMLInputElement>
    ) => React.ReactNode[] | React.ReactNode
}

export const Filter: React.FC<Props> = props => {
    const { url, filter, onChange } = props

    const [values, setValues] = useState<any[]>([])

    useEffect(() => {
        onChange(filters => {
            if (values.length) {
                return { ...filters, [filter]: values }
            }
            const newFilters: any = { ...filters }
            delete newFilters[filter]
            return newFilters
        })
    }, [values, filter, onChange])

    const changeHandler = (event: Change<HTMLInputElement>) => {
        const value: any = +event.target.value || event.target.value
        setValues((currentvalues: any[]) => {
            if (values.includes(value)) {
                return currentvalues.filter((v: any) => v !== value)
            }
            return [...currentvalues, value]
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
            <ul>{props.children(data, values, changeHandler)}</ul>
        </li>
    )
}
