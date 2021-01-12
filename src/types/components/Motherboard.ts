import { Component } from './Component'

export interface Motherboard extends Component {
    socket: string
    chipset: string
    ramCapacity: number
    maxRamSpeed: number
    ramSlots: number
    ramType: string
    m2Ports: number
    sataPorts: number
    pciSlots: number
    nvidiaSli: boolean
    amdCrossfire: boolean
    format: string
    consumption: number
}
