import React, { Component, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { GET_FULL_COMPONENT_URL, GET_FULL_IMAGE_URL } from '../../../../constants'
import { useIsMounted } from '../../../../hooks/useIsMounted'
import { Product } from '../../../../types/product/Product'
import styles from './BuilderProductCard.module.scss'

interface Props {
    product: Product
}

export const BuilderProductCard: FunctionComponent<Props> = props => {
    const [component, setComponent] = useState<Component | null>(null)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const fetchData = useCallback(async () => {
        const response = await fetch(
            GET_FULL_COMPONENT_URL(props.product.type, String(props.product.id))
        )

        const data = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setComponent(null)
            return
        }
        setComponent(data.component)
    }, [props, isMounted])

    return (
        <button className={styles.root} onClick={fetchData}>
            <img src={GET_FULL_IMAGE_URL(props.product.images[0].url)} alt={props.product.name} />
            <div>
                <p>{props.product.name}</p>
                <h3>{props.product.price}лв.</h3>
            </div>
        </button>
    )
}
