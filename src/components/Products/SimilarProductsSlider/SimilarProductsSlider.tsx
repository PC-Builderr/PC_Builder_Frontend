import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { ITEMS_PER_SLIDER, PRODUCTS_API_URL } from '../../../constants'
import { useIsMounted } from '../../../hooks/useIsMounted'
import { Product } from '../../../types/Product'
import { ProductArrayResponse } from '../../../types/ProductArrayResponse'
import styles from './SimilarProductsSlider.module.scss'
import { SliderItem } from './SliderItem'

interface Props {
    search: string
}

const urlSearchParams: URLSearchParams = new URLSearchParams([
    ['count', String(ITEMS_PER_SLIDER)],
    ['page', '1']
])

export const SimilarProductsSlider: FunctionComponent<Props> = ({ search }) => {
    const [products, setProducts] = useState<Product[] | null>(null)
    const [disable, setDisable] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(0)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const rootRef = useRef<HTMLDivElement>(null)

    const fetchData = useCallback(async () => {
        const response = await fetch(`${PRODUCTS_API_URL}?${urlSearchParams}`)
        if (!response.ok) {
            setProducts(null)
            return
        }

        if (!isMounted.current) return

        const data: ProductArrayResponse = await response.json()

        setProducts(data.products)
    }, [isMounted])

    const clickHandler = useCallback((index: number) => {
        setIndex((currentIndex: number) => currentIndex + index)
    }, [])

    useEffect(() => {
        if (!search) return

        urlSearchParams.set('search', search)
        fetchData()
    }, [search, fetchData])

    useEffect(() => {
        setDisable(
            index * (rootRef.current?.firstElementChild?.firstElementChild?.clientWidth || 0) >
                (products?.length || 0) *
                    (rootRef.current?.firstElementChild?.firstElementChild?.clientWidth || 0) -
                    (rootRef.current?.clientWidth || 0)
        )
    }, [index, rootRef, products])

    return (
        <div className={styles.root} ref={rootRef}>
            <>
                <ul
                    style={{
                        transform: `translate(${
                            index *
                            -(
                                rootRef.current?.firstElementChild?.firstElementChild
                                    ?.clientWidth || 0
                            )
                        }px)`
                    }}
                >
                    {products?.map((product: Product) => (
                        <SliderItem key={product.id} product={product} />
                    ))}
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
