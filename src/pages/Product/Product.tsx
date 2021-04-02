import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { ProductHeroSection } from '../../components/Products/ProductHeroSection'
import { ProductTable } from '../../components/Products/ProductTable'
import { SimilarProductsSlider } from '../../components/Products/SimilarProductsSlider'
import { useFetchComponent } from '../../hooks/HTTP/useFetchComponent'
import { ProductPage } from '../../types/params/ProductPage'

export const Product: FunctionComponent = () => {
    const { id, type } = useParams<ProductPage>()

    const { component, error } = useFetchComponent(type, id)

    return (
        <>
            {component && (
                <>
                    <ProductHeroSection product={component.product} />
                    <ProductTable type={type} component={component} />
                    <SimilarProductsSlider
                        id={component.productId}
                        search={component.product.metaData}
                    />
                </>
            )}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </>
    )
}
