import React, { FunctionComponent } from 'react'
import { BRANDS_API_URL } from '../../../constants'
import { Brand } from '../../../types/product/Brand'
import { ChangeHandler } from '../../../types/Handlers'
import { Filter } from './Filter'
import styles from './ProductFilters.module.scss'
import { PriceFilter } from './PriceFilter'
import { Checkbox, FormControlLabel } from '@material-ui/core'

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
                            <FormControlLabel
                                className={styles.Checkbox}
                                key={brand.id}
                                control={
                                    <Checkbox
                                        checked={Boolean(props.filters?.brands?.includes(brand.id))}
                                        onChange={changeHandler}
                                        value={brand.id}
                                        name={brand.name}
                                        color='primary'
                                    />
                                }
                                label={brand.name}
                            />
                        ))
                    }
                </Filter>
                <PriceFilter filters={props.filters} onChange={props.onChange} type={props.type} />
            </ul>
        </aside>
    )
}
