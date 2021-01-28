import React, { FunctionComponent } from 'react'
import { useFetchFilteredProducts } from '../../../../hooks/HTTP/useFetchFilteredProducts'
import { ProductList } from '../../../Products/ProductList'
import styles from './ComponentList.module.scss'

interface Props {
    type: string
}

export const ComponentList: FunctionComponent<Props> = props => {
    const { type } = props

    const {
        state: { loading, products }
    } = useFetchFilteredProducts(type)

    return (
        <div className={styles.root}>
            {products && !loading && <ProductList products={products} />}
        </div>
    )
}
