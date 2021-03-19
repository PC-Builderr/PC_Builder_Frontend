import { User } from '../user/User'

export interface Admin {
    id: number
    userId: number
    user: User
}
