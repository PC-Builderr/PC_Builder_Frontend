import React from 'react'
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
                    url={`${process.env.REACT_APP_API_URL}/brand?type=${props.type}`}
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
