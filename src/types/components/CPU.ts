import { Component } from './Component'

export interface CPU extends Component {
    model: string
    generation: string
    socket: string
    core: number
    thread: number
    speed: number
    turboSpeed: number
    ramCapacity: number
    maxRamSpeed: number
    ramChannels: number
    ramType: string
    cache: string
    integratedGraphics?: string
    consumption: number
}
