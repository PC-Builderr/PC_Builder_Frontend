import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductHeroSection } from '../../components/Products/ProductHeroSection'
import { ProductTable } from '../../components/Products/ProductTable'
import { SimilarProductsSlider } from '../../components/Products/SimilarProductsSlider'
import { getFullComponentUrl } from '../../constants'
import { useIsMounted } from '../../hooks/useIsMounted'
import { Component } from '../../types/components/Component'
import { Error } from '../../types/Error'
import { ProductPage } from '../../types/params/ProductPage'

interface Props {}

export const Product: React.FC<Props> = props => {
    const { id, type } = useParams<ProductPage>()

    const [component, setComponent] = useState<Component | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const fetchData = useCallback(async () => {
        setComponent(null)
        setError(null)

        const response = await fetch(getFullComponentUrl(type, id))

        const resData = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setError(resData)
            return
        }

        setComponent(resData.component)
    }, [type, id, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <>
            {component && (
                <>
                    <ProductHeroSection product={component.product} />
                    <ProductTable type={type} component={component} />
                    <SimilarProductsSlider product={component.product} />
                </>
            )}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </>
    )
}
