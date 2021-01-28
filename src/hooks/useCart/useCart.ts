import { useCallback, useContext } from 'react'
import { CartContextInterface } from '../../context/Cart/CartContectInterface'
import { CartContext } from '../../context/Cart/CartContext'
import { CartItem } from '../../types/CartEntry'

interface Methods {
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    mutateItem: (item: CartItem) => void
    clearCart: () => void
}

interface CartState {
    items: CartItem[]
    methods: Methods
}

export const useCart = (): CartState => {
    const { items, setItems } = useContext<CartContextInterface>(CartContext)

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

    const clearCart = useCallback(() => {
        setItems([])
    }, [setItems])

    return { items, methods: { addItem, removeItem, mutateItem, clearCart } }
}
