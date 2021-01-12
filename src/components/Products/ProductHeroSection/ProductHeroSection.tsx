import React from 'react'
import { Product } from '../../../types/Product'
import { ImageSlider } from '../ImageSlider'
import { ProductSidebar } from '../ProductSidebar'
import styles from './ProductHeroSection.module.scss'

interface Props {
    product: Product
}

export const ProductHeroSection: React.FC<Props> = props => {
    return (
        <>
            <h3 className={styles.heading}>{props.product.name}</h3>
            <div className={styles.root}>
                <ImageSlider images={props.product.images} />
                <ProductSidebar price={props.product.price} />
            </div>
        </>
    )
}
