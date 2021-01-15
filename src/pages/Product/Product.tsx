import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductHeroSection } from '../../components/Products/ProductHeroSection'
import { ProductTable } from '../../components/Products/ProductTable'
import { SimilarProductsSlider } from '../../components/Products/SimilarProductsSlider'
import { useFetch } from '../../hooks/useFetch'
import { ComponentResponse } from '../../types/components/ComponentResponse'
import { ProductPage } from '../../types/params/ProductPage'
import { Component } from '../../types/components/Component'

interface Props {}

export const Product: React.FC<Props> = props => {
    const { id, type } = useParams<ProductPage>()

    const {
        fetchData,
        state: { data, error }
    } = useFetch<ComponentResponse<Component>>()

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/${type}/${id}`)
    }, [id, type, fetchData])

    return (
        <>
            {data && (
                <>
                    <ProductHeroSection product={data.component.product} />
                    <ProductTable type={type} component={data.component} />
                    <SimilarProductsSlider product={data.component.product} />
                </>
            )}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </>
    )
}
