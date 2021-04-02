import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { BRANDS_API_URL } from '../../../constants'
import { ChangeHandler } from '../../../types/Handlers'
import { Brand } from '../../../types/product/Brand'
import { CaseFilter } from './Components/CaseFilter'
import { CPUFilter } from './Components/CPUFilter'
import { StorageFilter } from './Components/StorageFilter'
import { Filter } from './Filter'
import { PriceFilter } from './PriceFilter'
import styles from './ProductFilters.module.scss'

interface Props {
    type: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
}
interface Data {
    brands: Brand[]
}

interface Series {
    series: string[]
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
                <Filter
                    filters={props.filters}
                    onChange={props.onChange}
                    filter='series'
                    name='Series'
                    url={`${process.env.REACT_APP_API_URL}/${props.type}/series`}
                >
                    {(data: Series, changeHandler: ChangeHandler<HTMLInputElement>) =>
                        data?.series.map((s: string) => (
                            <FormControlLabel
                                className={styles.Checkbox}
                                key={s}
                                control={
                                    <Checkbox
                                        checked={Boolean(props.filters?.series?.includes(s))}
                                        onChange={changeHandler}
                                        value={s}
                                        name={s}
                                        color='primary'
                                    />
                                }
                                label={s}
                            />
                        ))
                    }
                </Filter>
                <CaseFilter filters={props.filters} onChange={props.onChange} type={props.type} />
                <CPUFilter filters={props.filters} onChange={props.onChange} type={props.type} />
                <StorageFilter
                    filters={props.filters}
                    onChange={props.onChange}
                    type={props.type}
                />
            </ul>
        </aside>
    )
}
