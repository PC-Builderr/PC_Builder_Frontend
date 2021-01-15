import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { ITEMS_PER_SLIDER, PRODUCTS_API_URL } from '../../../constants'
import { useIsMounted } from '../../../hooks/useIsMounted'
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
    const [data, setData] = useState<ProductArrayResponse | null>(null)
    const [disable, setDisable] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(0)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const rootRef = useRef<HTMLDivElement>(null)

    const fetchData = useCallback(async () => {
        setData(null)

        const response = await fetch(`${PRODUCTS_API_URL}?${urlSearchParams}`)
        if (!response.ok) return

        if (!isMounted.current) return

        const resData = await response.json()

        setData(resData)
    }, [isMounted])

    const clickHandler = useCallback((index: number) => {
        setIndex((currentIndex: number) => currentIndex + index)
    }, [])

    useEffect(() => {
        if (!product) return

        urlSearchParams.set('search', [product.brand.name, product.name, product.type].join(' '))
        fetchData()
    }, [product, fetchData])

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
