import React, { useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { Product } from '../../interfaces/Product'

interface Props {
    children: React.ReactNode
}

export const CartContextProvider: React.FC<Props> = props => {
    const [products, setProducts] = useState<Product[]>(() => {
        return JSON.parse(localStorage.getItem('products') || '[]')
    })

    const modifyProducts = (product: Product) =>
        setProducts((oldProducts: Product[]) => {
            return oldProducts.find(p => p.id === product.id)
                ? oldProducts.filter(p => p.id !== product.id)
                : [...oldProducts, product]
        })

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products))
    }, [products])

    return (
        <CartContext.Provider value={{ products, modifyProducts }}>
            {props.children}
        </CartContext.Provider>
    )
}
