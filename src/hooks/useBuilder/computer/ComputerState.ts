import { Computer } from './Computer'

export interface ComputerState {
    setName: React.Dispatch<React.SetStateAction<string>>
    computer: Computer
    price: number
}
