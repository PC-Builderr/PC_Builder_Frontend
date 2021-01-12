import { CartItem } from '../../types/CartEntry'

export interface CartContextInterface {
    items: CartItem[]
    setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}
