import React, { FunctionComponent } from 'react'
import { Product } from '../../../types/product/Product'
import { ImageSlider } from '../ImageSlider'
import { ProductSidebar } from '../ProductSidebar'
import styles from './ProductHeroSection.module.scss'

interface Props {
    product: Product
}

export const ProductHeroSection: FunctionComponent<Props> = props => {
    return (
        <>
            <h3 className={styles.heading}>{props.product.name}</h3>
            <div className={styles.root}>
                <ImageSlider images={props.product.images} />
                <ProductSidebar price={props.product.price} id={props.product.id} />
            </div>
        </>
    )
}
