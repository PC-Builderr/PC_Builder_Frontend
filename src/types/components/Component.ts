import { Product } from '../product/Product'

export interface Component {
    id: number
    productId: number
    product: Product
    series: string
}
