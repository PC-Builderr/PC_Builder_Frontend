import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { Brand } from '../../../interfaces/Brand'
import { Checkbox } from '../../UI/Checkbox'
import { Foldable } from '../../UI/Foldable'
import styles from './ProductFilters.module.scss'

interface Props {}

export const ProductFilters: React.FC<Props> = props => {
    const [options, setOptions] = useState<string[]>([])

    const check = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (options.includes(value)) {
            setOptions((s: string[]) => s.filter(v => v !== value))
            return
        }
        setOptions(s => [...s, value])
    }

    const {
        fetchData,
        state: { data, error, loading }
    } = useFetch<{ brands: Brand[] }>()

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/brand`)
    }, [fetchData])

    return (
        <aside className={styles.root}>
            <ul>
                <Foldable name='Brands'>
                    {data &&
                        data.brands.map((brand: Brand) => {
                            return (
                                <Checkbox
                                    key={brand.id}
                                    id={brand.name}
                                    name={brand.name}
                                    onChange={check}
                                    value={brand.name}
                                />
                            )
                        })}
                </Foldable>
            </ul>
        </aside>
    )
}
