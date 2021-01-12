import { Component } from './Component'

export interface RAM extends Component {
    type: string
    voltage: number
    speed: number
    capacity: number
    consumption: number
}
