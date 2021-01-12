import { Component } from './Component'

export interface PSU extends Component {
    power: number
    efficiency: number
    certificate: string
    modular: boolean
}
