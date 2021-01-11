import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ImageSlider } from '../../../components/Products/ImageSlider'
import { useFetch } from '../../../hooks/useFetch'
import { CPUResponse } from '../../../types/cpu/CPUResponse'
import { ProductPage } from '../../../types/params/ProductPage'
import styles from './CPUProduct.module.scss'

interface Props {}

export const CPUProduct: React.FC<Props> = props => {
    const [] = useState()

    const { id } = useParams<ProductPage>()

    const {
        fetchData,
        state: { data, error, loading }
    } = useFetch<CPUResponse>()

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/cpu/${id}`)
    }, [id, fetchData])

    return (
        <div className={styles.root}>
            {data && (
                <>
                    <ImageSlider images={data.cpu.product.images}></ImageSlider>
                </>
            )}
            {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </div>
    )
}
