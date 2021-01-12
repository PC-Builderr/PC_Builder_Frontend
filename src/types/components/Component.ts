import { Product } from '../Product'

export interface Component {
    id: number
    productId: number
    product: Product
    series: string
}
