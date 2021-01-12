import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { Product } from '../../../types/Product'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import styles from './SimilarProductsSlider.module.scss'
import { SliderItem } from './SliderItem'

interface Props {
    search: string
}

export const SimilarProductsSlider: React.FC<Props> = props => {
    const {
        fetchData,
        state: { data }
    } = useFetch<ProductArrayResponse>()
    const [disable, setDisable] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(0)
    const rootRef = useRef<HTMLDivElement>(null)

    const urlSearchParams: string = useMemo(() => {
        return new URLSearchParams([
            ['count', '15'],
            ['page', '1'],
            ['search', '']
        ]).toString()
    }, [])

    const clickHandler = useCallback((index: number) => {
        setIndex((currentIndex: number) => {
            return currentIndex + index
        })
    }, [])

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/product?${urlSearchParams}`)
    }, [fetchData, urlSearchParams])

    useEffect(() => {
        setDisable(
            index * (rootRef.current?.firstElementChild?.firstElementChild?.clientWidth || 0) -
                150 >
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
