import React from 'react'
import { Product } from '../../types/Product'
import { CartContextInterface } from './CartContectInterface'

export const CartContext = React.createContext<CartContextInterface>({
    products: [],
    modifyProducts: (product: Product) => {}
})
