import { Product } from '../../interfaces/Product'

export interface CartContextInterface {
    products: Product[]
    modifyProducts: (product: Product) => void
}
