import { Component } from './Component'

export interface GPU extends Component {
    speed: number
    memory: number
    memoryType: string
    busWidth: number
    format: string
    consumption: number
}
