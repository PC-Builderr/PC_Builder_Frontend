import { Country } from './Country'

export interface City {
    id: number
    country: Country
    postCode: string
    name: string
    nameEn: string
    regionName: string
    regionNameEn: string
    phoneCode: string
    location: any
    expressCityDeliveries: boolean
}
