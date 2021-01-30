import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useMemo } from 'react'
import { GET_FULL_COMPONENT_URL } from '../../../constants'
import { useFetchFilteredProducts } from '../../../hooks/HTTP/useFetchFilteredProducts'
import { useIsMounted } from '../../../hooks/useIsMounted'
import { Product } from '../../../types/Product'
import { Label } from '../../UI/Label'
import styles from './SelectComponent.module.scss'

interface Props {
    type: string
    setComponent: React.Dispatch<React.SetStateAction<any>>
    filters: any
}

export const SelectComponent: FunctionComponent<Props> = props => {
    const { setComponent, type } = props

    const {
        state: { products },
        methods: { setFilters }
    } = useFetchFilteredProducts(props.type)

    useEffect(() => {
        setFilters(props.filters)
    }, [props.filters, setFilters])

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const changeHandler = useCallback(
        async (event: ChangeEvent<HTMLSelectElement>) => {
            if (!event.target.value) {
                setComponent(null)
                return
            }

            const response = await fetch(GET_FULL_COMPONENT_URL(type, event.target.value))

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
            <Label htmlFor={type}>{type}</Label>
            <select name={type} id={type} onChange={changeHandler}>
                <option value='' defaultChecked>
                    Choose Component
                </option>
                {products?.map((product: Product) => (
                    <option value={product.id} key={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
