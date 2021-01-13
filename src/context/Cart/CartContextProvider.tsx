import React, { useState } from 'react'
import { CartItem } from '../../types/CartEntry'
import { CartContext } from './CartContext'

interface Props {
    children: React.ReactNode
}

export const CartContextProvider: React.FC<Props> = props => {
    const [items, setItems] = useState<CartItem[]>(() => {
        return JSON.parse(localStorage.getItem('cart-items') || '[]')
    })

    return <CartContext.Provider value={{ items, setItems }}>{props.children}</CartContext.Provider>
}
