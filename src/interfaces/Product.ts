import { Brand } from './Brand'
import { Image } from './Image'

export interface Product {
    id: number
    name: string
    description: string
    price: number
    type: string
    images: Image[]
    brand: Brand
    brandId: number
}
