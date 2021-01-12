import React from 'react'
import { CartContextInterface } from './CartContectInterface'

export const CartContext = React.createContext<CartContextInterface>({
    items: [],
    setItems: () => {}
})
