import { Product } from '../product/Product'
import { Order } from './Order'

export interface OrderProduct {
    orderId: number
    productId: number
    quantity: number
    product?: Product
    order?: Order
}
