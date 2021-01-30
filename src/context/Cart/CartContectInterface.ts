import { CartItem } from '../../types/cart/CartEntry'

export interface CartContextInterface {
    items: CartItem[]
    setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}
