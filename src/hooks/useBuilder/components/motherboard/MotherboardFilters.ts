export interface MotherboardFilters {
    socket?: string
    ramType?: string
    ramCapacity?: number
    ramSlots?: number
    sataPorts?: number
    m2Ports?: number
    pciSlots?: number
    nvidiaSli?: boolean
    amdCrossfire?: boolean
    format?: string[]
}
