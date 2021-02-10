import { useCallback, useContext, useEffect, useState } from 'react'
import { ShippingPriceResponse } from '../../types/econt/ShippingPriceResponse'
import { useIsMounted } from '../useIsMounted'
import { CALCULATE_SHIPPING_API_URL } from '../../constants'
import { CartContext } from '../../context/Cart/CartContext'
import { CartContextInterface } from '../../context/Cart/CartContectInterface'

export const useFetchShippingPrice = (): ShippingPriceResponse => {
    const [shippingPrice, setShippingPrice] = useState<number>(0)

    const { items } = useContext<CartContextInterface>(CartContext)

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const fetchData = useCallback(async () => {
        const response = await fetch(CALCULATE_SHIPPING_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        })

        const data: ShippingPriceResponse = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setShippingPrice(0)
            return
        }

        setShippingPrice(data.shippingPrice)
    }, [isMounted, items])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { shippingPrice }
}
