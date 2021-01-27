import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { PRODUCTS_API_URL } from '../../constants'
import { useCart } from '../../hooks/useCart'
import { CartItem } from '../../types/CartEntry'
import { Product } from '../../types/Product'
import styles from './Cart.module.scss'

export const Cart: FunctionComponent = () => {
    const { items } = useCart()

    const [data, setData] = useState<{ products: Product[] } | null>(null)
    const [error, setError] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)

    const fetchData = useCallback(async () => {
        if (!items.length) return

        setData(null)
        setError(false)

        const response = await fetch(
            `${PRODUCTS_API_URL}/ids?${items.reduce(
                (query: string, item: CartItem): string => `${query}${query && '&'}ids=${item.id}`,
                ''
            )}`
        )

        const resData = await response.json()

        if (!response.ok) {
            setError(true)
            return
        }

        setData(resData)

        const cost: number = items.reduce((cost: number, item: CartItem): number => {
            const product: Product = resData.products.find(
                (product: Product) => product.id === item.id
            )

            return cost + product.price * item.quantity
        }, 0)

        setTotal(cost)
    }, [items])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (!items.length) {
        return <Redirect to='/' />
    }

    return (
        <div className={styles.root}>
            <h3>Cart</h3>
            <h1>{total}лв.</h1>
            <pre>{JSON.stringify(items, null, 2)}</pre>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            <Link to='/checkout'>Checkout</Link>
        </div>
    )
}
