export const ITEMS_PER_PAGE: number = 20
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

//API routes func
export const getFullImageUrl = (url: string): string => `${process.env.REACT_APP_API_URL}${url}`
export const getComponentsUrl = (type: string): string => `${process.env.REACT_APP_API_URL}/${type}`
export const getFullComponentUrl = (type: string, id: string): string =>
    `${getComponentsUrl(type)}/${id}`
