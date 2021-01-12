import { Component } from './Component'

export interface Storage extends Component {
    type: string
    capacity: number
    readSpeed: number
    writeSpeed: number
    consumption: number
}
