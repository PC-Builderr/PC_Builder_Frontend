import React, { useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { CartItem } from '../../types/CartEntry'

interface Props {
    children: React.ReactNode
}

export const CartContextProvider: React.FC<Props> = props => {
    const [items, setItems] = useState<CartItem[]>(() => {
        return JSON.parse(localStorage.getItem('cart-items') || '[]')
    })

    useEffect(() => {
        console.log(items)
    }, [items])

    return <CartContext.Provider value={{ items, setItems }}>{props.children}</CartContext.Provider>
}
