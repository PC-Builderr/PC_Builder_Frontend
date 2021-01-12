import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImageSlider } from '../../components/Products/ImageSlider'
import { ProductHeroSection } from '../../components/Products/ProductHeroSection'
import { ProductTable } from '../../components/Products/ProductTable'
import { CPUProductTable } from '../../components/Products/ProductTable/CPUProductTable'
import { useFetch } from '../../hooks/useFetch'
import { ComponentResponse } from '../../types/components/ComponentResponse'
import { CPU } from '../../types/components/CPU'
import { ProductPage } from '../../types/params/ProductPage'
import styles from './Product.module.scss'

interface Props {}

export const Product: React.FC<Props> = props => {
    const { id, type } = useParams<ProductPage>()

    const {
        fetchData,
        state: { data }
    } = useFetch<ComponentResponse<CPU>>()

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/${type}/${id}`)
    }, [id, type, fetchData])

    useEffect(() => {
        console.log(data)
    })

    return (
        <div className={styles.root}>
            {data && <ProductHeroSection product={data.component.product} />}
            {/* {error && <pre>{JSON.stringify(error, null, 2)}</pre>} */}

            {data && <ProductTable type={type} component={data.component} />}
        </div>
    )
}
