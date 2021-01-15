export interface SignUpCredentials {
    name: string
    email: string
    password: string
    ['confirm-password']: string
}
