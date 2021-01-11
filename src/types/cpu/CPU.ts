import { Product } from '../Product'

export interface CPU {
    id: number

    productId: number

    product: Product

    model: string

    generation: string

    series: string

    socket: string

    core: number

    thread: number

    speed: number

    turboSpeed: number

    ramCapacity: number

    maxRamSpeed: number

    ramChannels: number

    ramType: string

    cache: string

    integratedGraphics: string | null

    consumption: number
}
