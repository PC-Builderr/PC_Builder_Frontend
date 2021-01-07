import { Product } from '../../types/Product'

export interface CartContextInterface {
    products: Product[]
    modifyProducts: (product: Product) => void
}
