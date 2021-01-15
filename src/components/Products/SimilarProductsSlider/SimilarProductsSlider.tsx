import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { ITEMS_PER_SLIDER } from '../../../constants'
import { useFetch } from '../../../hooks/useFetch'
import { Product } from '../../../types/Product'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import styles from './SimilarProductsSlider.module.scss'
import { SliderItem } from './SliderItem'

interface Props {
    product: Product
}

const urlSearchParams: URLSearchParams = new URLSearchParams([
    ['count', String(ITEMS_PER_SLIDER)],
    ['page', '1']
])

export const SimilarProductsSlider: React.FC<Props> = ({ product }) => {
    const {
        fetchData,
        state: { data }
    } = useFetch<ProductArrayResponse>()

    const [disable, setDisable] = useState<boolean>(false)

    const [index, setIndex] = useState<number>(0)

    const rootRef = useRef<HTMLDivElement>(null)

    const clickHandler = useCallback((index: number) => {
        setIndex((currentIndex: number) => {
            return currentIndex + index
        })
    }, [])

    useEffect(() => {
        if (product) {
            urlSearchParams.set(
                'search',
                [product.brand.name, product.name, product.type].join(' ')
            )
            fetchData(`${process.env.REACT_APP_API_URL}/product?${urlSearchParams}`)
        }
    }, [fetchData, product])

    useEffect(() => {
        setDisable(
            index * (rootRef.current?.firstElementChild?.firstElementChild?.clientWidth || 0) >
                (data?.products.length || 0) *
                    (rootRef.current?.firstElementChild?.firstElementChild?.clientWidth || 0) -
                    (rootRef.current?.clientWidth || 0)
        )
    }, [index, rootRef, data])

    return (
        <div className={styles.root} ref={rootRef}>
            <>
                <ul>
                    {data &&
                        data.products.map((product: Product) => {
                            return (
                                <SliderItem
                                    key={product.id}
                                    product={product}
                                    scroll={
                                        index *
                                        -(
                                            rootRef.current?.firstElementChild?.firstElementChild
                                                ?.clientWidth || 0
                                        )
                                    }
                                />
                            )
                        })}
                </ul>
                <button disabled={index === 0} onClick={clickHandler.bind(null, -1)}>
                    <MdKeyboardArrowLeft />
                </button>
                <button disabled={disable} onClick={clickHandler.bind(null, 1)}>
                    <MdKeyboardArrowRight />
                </button>
            </>
        </div>
    )
}
