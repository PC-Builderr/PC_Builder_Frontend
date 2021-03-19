import React, { FunctionComponent } from 'react'
import { BRANDS_API_URL } from '../../../constants'
import { Brand } from '../../../types/product/Brand'
import { ChangeHandler } from '../../../types/Handlers'
import { Checkbox } from '../../UI/Checkbox'
import { Filter } from './Filter'
import styles from './ProductFilters.module.scss'
import { PriceFilter } from './PriceFilter'

interface Props {
    type: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
}
interface Data {
    brands: Brand[]
}

export const ProductFilters: FunctionComponent<Props> = props => {
    return (
        <aside className={styles.root}>
            <ul>
                <Filter
                    filters={props.filters}
                    onChange={props.onChange}
                    filter='brands'
                    name='Brands'
                    url={`${BRANDS_API_URL}?type=${props.type}`}
                >
                    {(data: Data, changeHandler: ChangeHandler<HTMLInputElement>) =>
                        data?.brands.map((brand: Brand) => (
                            <Checkbox
                                checked={Boolean(props.filters?.brands?.includes(brand.id))}
                                key={brand.id}
                                id={brand.name}
                                name={brand.name}
                                onChange={changeHandler}
                                value={brand.id}
                            />
                        ))
                    }
                </Filter>
                <PriceFilter type={props.type} />
            </ul>
        </aside>
    )
}
