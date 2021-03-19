import { useCallback, useContext, useState } from 'react'
import { SHIPPING_ADDRESS_API_URL } from '../../constants'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { CreateShippingAddressDto } from '../../types/order/CreateShippingAddressDto'
import { ShippingAddress } from '../../types/order/ShippingAddress'
import { ShippingAddressesResponse } from '../../types/order/ShippingAddressesResponse'

interface UseShippingAddress {
    shippingAddresses: ShippingAddress[] | null
    getShippingAddresses: () => Promise<void>
    createShippingAddress: (createShippingAddressDto: CreateShippingAddressDto) => Promise<void>
}

export const useShippingAddress = (): UseShippingAddress => {
    const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[] | null>(null)

    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const getShippingAddresses = useCallback(async () => {
        const response = await fetch(SHIPPING_ADDRESS_API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authState?.token}`
            }
        })

        if (!response.ok) {
            return
        }

        const { shippingAddresses }: ShippingAddressesResponse = await response.json()

        setShippingAddresses(shippingAddresses)
    }, [authState])

    const createShippingAddress = useCallback(
        async (createShippingAddressDto: CreateShippingAddressDto) => {
            const response = await fetch(SHIPPING_ADDRESS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify(createShippingAddressDto)
            })

            if (!response.ok) {
                return
            }

            const shippingAddress: ShippingAddress = await response.json()

            setShippingAddresses((shippingAddresses: ShippingAddress[] | null) => {
                return shippingAddresses
                    ? [...shippingAddresses, shippingAddress]
                    : [shippingAddress]
            })
        },
        [authState]
    )

    return {
        shippingAddresses,
        getShippingAddresses,
        createShippingAddress
    }
}
