import { useCallback, useContext, useEffect, useState } from 'react'
import { PRODUCTS_API_URL } from '../../constants'
import { CartContextInterface } from '../../context/Cart/CartContectInterface'
import { CartContext } from '../../context/Cart/CartContext'
import { CartItem } from '../../types/CartEntry'
import { Product } from '../../types/Product'

interface Methods {
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    mutateItem: (item: CartItem) => void
    populateData: () => void
    getItemQuantityById: (id: number) => number
}

interface Data {
    total: number
    products: Product[] | null
}

interface CartState {
    items: CartItem[]
    data: Data
    methods: Methods
}

export const useCart = (): CartState => {
    const { items, setItems } = useContext<CartContextInterface>(CartContext)

    const [products, setProducts] = useState<Product[] | null>(null)
    const [total, setTotal] = useState<number>(0)

    const addItem = useCallback(
        (item: CartItem) => {
            const itemInCart: CartItem | undefined = items.find((i: CartItem) => i.id === item.id)

            setItems((currentItems: CartItem[]) => [
                ...currentItems.filter((i: CartItem) => i.id !== item.id),
                { id: item.id, quantity: item.quantity + (itemInCart?.quantity || 0) }
            ])
        },
        [items, setItems]
    )

    const removeItem = useCallback(
        (id: number) => {
            setItems((currentItems: CartItem[]) =>
                currentItems.filter((item: CartItem) => item.id !== id)
            )
        },
        [setItems]
    )

    const mutateItem = useCallback(
        (item: CartItem) => {
            setItems((currentItems: CartItem[]) => {
                const mutatedItems: CartItem[] = currentItems.filter(
                    (i: CartItem) => i.id !== item.id
                )
                mutatedItems.push(item)
                return mutatedItems
            })
        },
        [setItems]
    )

    const getItemQuantityById = useCallback(
        (id: number): number => {
            const item: CartItem | null = items.find(item => item.id === id) ?? null

            if (!item) {
                return 0
            }

            return item?.quantity
        },
        [items]
    )

    const populateData = useCallback(async () => {
        if (!items.length) return

        const response = await fetch(
            `${PRODUCTS_API_URL}/ids?${items.reduce(
                (query: string, item: CartItem): string => `${query}${query && '&'}ids=${item.id}`,
                ''
            )}`
        )

        const resData = await response.json()

        if (!response.ok) {
            setProducts(null)
            return
        }

        setProducts(resData.products)

        const cost: number = items.reduce((cost: number, item: CartItem): number => {
            const product: Product = resData.products.find(
                (product: Product) => product.id === item.id
            )

            return cost + product.price * item.quantity
        }, 0)

        setTotal(cost)
    }, [items])

    useEffect(() => {
        localStorage.setItem('cart-items', JSON.stringify(items))
    }, [items])

    return {
        items,
        data: { products, total },
        methods: { addItem, removeItem, mutateItem, populateData, getItemQuantityById }
    }
}
