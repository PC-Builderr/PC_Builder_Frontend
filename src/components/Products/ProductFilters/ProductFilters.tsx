import React from 'react'
import { BRANDS_API_URL } from '../../../constants'
import { Brand } from '../../../types/Brand'
import { ChangeHandler } from '../../../types/Handlers'
import { Checkbox } from '../../UI/Checkbox'
import { Filter } from './Filter'
import styles from './ProductFilters.module.scss'

interface Props {
    type: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
}
interface Data {
    brands: Brand[]
}

export const ProductFilters: React.FC<Props> = props => {
    return (
        <aside className={styles.root}>
            <ul>
                <Filter
                    filters={props.filters}
                    onChange={props.onChange}
                    filter='brand'
                    name='Brands'
                    url={`${BRANDS_API_URL}?type=${props.type}`}
                >
                    {(data: Data, changeHandler: ChangeHandler<HTMLInputElement>) =>
                        data &&
                        data.brands.map((brand: Brand) => {
                            return (
                                <Checkbox
                                    checked={Boolean(props.filters?.brand?.includes(brand.id))}
                                    key={brand.id}
                                    id={brand.name}
                                    name={brand.name}
                                    onChange={changeHandler}
                                    value={brand.id}
                                />
                            )
                        })
                    }
                </Filter>
            </ul>
        </aside>
    )
}
