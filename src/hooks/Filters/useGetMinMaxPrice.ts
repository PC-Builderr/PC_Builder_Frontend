import { useCallback, useEffect, useState } from 'react'
import { MIN_MAX_PRICE_API_URL } from '../../constants'

export interface MinMaxPrice {
    min: number
    max: number
}

export const useGetMinMaxPrice = (type: string): MinMaxPrice | null => {
    const [minMaxPrice, setMinMaxPrice] = useState<MinMaxPrice | null>(null)

    const getPrice = useCallback(async () => {
        const response = await fetch(MIN_MAX_PRICE_API_URL + '/' + type)

        if (!response.ok) {
            return
        }

        const minMaxPrice: MinMaxPrice = await response.json()

        setMinMaxPrice(minMaxPrice)
    }, [type])

    useEffect(() => {
        getPrice()
    }, [getPrice])

    return minMaxPrice
}
