import React, { FunctionComponent } from 'react'
import { Product } from '../../../types/product/Product'
import { Header } from '../../UI/Header'
import { ImageSlider } from '../ImageSlider'
import { ProductSidebar } from '../ProductSidebar'
import styles from './ProductHeroSection.module.scss'

interface Props {
    product: Product
}

export const ProductHeroSection: FunctionComponent<Props> = props => {
    return (
        <>
            <Header>{props.product.name}</Header>
            <div className={styles.root}>
                <ImageSlider images={props.product.images} />
                <ProductSidebar price={props.product.price} id={props.product.id} />
            </div>
        </>
    )
}
