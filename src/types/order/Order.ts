import { User } from '../user/User'
import { OrderProduct } from './OrderProduct'
import { ShippingAddress } from './ShippingAddress'
import { Admin } from '../admin/Admin'

export interface Order {
    id: number
    shipmentNumber?: string
    paymentIntentId: string
    status: string
    adminId?: number
    admin?: Admin
    userId: number
    user?: User
    shippingAddressId?: number
    shippingAddress?: ShippingAddress
    expectedDeliveryDate?: string
    pdfURL?: string
    recieptUrl?: string
    orderProducts?: OrderProduct[]
    productsPrice: number
    shippingPrice: number
    total: number
}
