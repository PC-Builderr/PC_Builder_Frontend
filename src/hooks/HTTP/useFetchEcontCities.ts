import { useCallback, useEffect, useState } from 'react'
import { ECONT_CITIES_URL } from '../../constants'
import { City } from '../../types/econt/City'
import { useIsMounted } from '../useIsMounted'

interface CitiesResponse {
    cities: City[]
}

export const useFetchEcontCities = (): CitiesResponse => {
    const [cities, setCities] = useState<City[]>([])

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const fetchData = useCallback(async () => {
        const response = await fetch(ECONT_CITIES_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                countryCode: 'BGR'
            })
        })

        const data: CitiesResponse = await response.json()

        if (!isMounted.current) return

        if (!response.ok) {
            setCities([])
            return
        }
        console.log(data.cities.length)
        setCities(data.cities.slice(0, 1000))
    }, [isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { cities }
}
