import React from 'react'
import { Brand } from '../../../types/Brand'
import { Checkbox } from '../../UI/Checkbox'
import { Filter } from './Filter'
import { ChangeHandler } from '../../../types/Handlers'
import styles from './ProductFilters.module.scss'

interface Props {
    type: string
}
interface Data {
    brands: Brand[]
}

export const ProductFilters: React.FC<Props> = props => {
    return (
        <aside className={styles.root}>
            <ul>
                <Filter filter='brand' name='Brands' url={`${process.env.REACT_APP_API_URL}/brand`}>
                    {(data: Data, changeHandler: ChangeHandler<HTMLInputElement>) =>
                        data &&
                        data.brands.map((brand: Brand) => {
                            return (
                                <Checkbox
                                    key={brand.id}
                                    id={brand.name}
                                    name={brand.name}
                                    onChange={changeHandler}
                                    value={brand.name}
                                />
                            )
                        })
                    }
                </Filter>
            </ul>
        </aside>
    )
}
