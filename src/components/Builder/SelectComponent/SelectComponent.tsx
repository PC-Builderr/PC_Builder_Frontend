import React, {
    ChangeEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import { GET_FULL_COMPONENT_URL } from '../../../constants'
import { useFetchFilteredProducts } from '../../../hooks/HTTP/useFetchFilteredProducts'
import { useIsMounted } from '../../../hooks/useIsMounted'
import { Product } from '../../../types/product/Product'
import { Label } from '../../UI/Label'
import styles from './SelectComponent.module.scss'

interface Props {
    type: string
    setComponent: React.Dispatch<React.SetStateAction<any>>
    filters: any
    id: string
}

export const SelectComponent: FunctionComponent<Props> = props => {
    const { setComponent, type, id, filters } = props

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const {
        state: { products, error },
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
            <select name={type} id={id} onChange={changeHandler}>
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
