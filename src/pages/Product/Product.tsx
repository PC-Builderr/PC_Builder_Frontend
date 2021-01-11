import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImageSlider } from '../../components/Products/ImageSlider'
import { useFetch } from '../../hooks/useFetch'
import { ComponentResponse } from '../../types/components/ComponentResponse'
import { ProductPage } from '../../types/params/ProductPage'
import styles from './Product.module.scss'

interface Props {}

export const Product: React.FC<Props> = props => {
    const { id, type } = useParams<ProductPage>()

    const {
        fetchData,
        state: { data, error }
    } = useFetch<ComponentResponse>()

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/${type}/${id}`)
    }, [id, type, fetchData])

    useEffect(() => {
        console.log(data)
    })

    return (
        <div className={styles.root}>
            {data && (
                <>
                    <ImageSlider images={data.component.product.images} />
                </>
            )}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </div>
    )
}
