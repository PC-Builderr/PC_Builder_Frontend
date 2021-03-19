export const ITEMS_PER_PAGE: number = 12
export const ITEMS_PER_SLIDER: number = 20

export const SERVER_ERROR: string = 'server'
export const CREDENTIALS_ERROR: string = 'credentials'

export const ONE_SECOND_IN_MS: number = 1000

// API routes
export const SIGN_IN_API_URL: string = `${process.env.REACT_APP_API_URL}/auth/sign-in`
export const SIGN_UP_API_URL: string = `${process.env.REACT_APP_API_URL}/auth/sign-up`
export const PRODUCTS_API_URL: string = `${process.env.REACT_APP_API_URL}/product`
export const REFRESH_TOKEN_API_URL: string = `${process.env.REACT_APP_API_URL}/auth/refresh-token`
export const LOGOUT_API_URL: string = `${process.env.REACT_APP_API_URL}/auth/logout`
export const BRANDS_API_URL: string = `${process.env.REACT_APP_API_URL}/brand`
export const COMPUTER_API_URL: string = `${process.env.REACT_APP_API_URL}/computer`
export const CALCULATE_SHIPPING_API_URL: string = `${process.env.REACT_APP_API_URL}/econt/calculate`
export const SHIPPING_ADDRESS_API_URL: string = `${process.env.REACT_APP_API_URL}/shipping-address`
export const MIN_MAX_PRICE_API_URL: string = `${process.env.REACT_APP_API_URL}/product`

export const ECONT_CITIES_URL: string =
    'http://ee.econt.com/services/Nomenclatures/NomenclaturesService.getCities.json'

//API routes func
export const GET_FULL_IMAGE_URL = (url: string): string => `${process.env.REACT_APP_API_URL}${url}`
export const GET_COMPONENTS_URL = (type: string): string =>
    `${process.env.REACT_APP_API_URL}/${type}`
export const GET_FULL_COMPONENT_URL = (type: string, id: string): string =>
    `${GET_COMPONENTS_URL(type)}/${id}`

export const SATA_TYPE: string = 'SATA'
export const M2_TYPE: string = 'М.2 NVMe'

export const ComponentNames: Map<string, string> = new Map([
    ['gpu', 'Graphics Cards'],
    ['cpu', 'Processors'],
    ['psu', 'Power supplies'],
    ['ram', 'RAM'],
    ['case', 'Cases'],
    ['storage', 'Storages'],
    ['motherboard', 'Motherboards']
])
