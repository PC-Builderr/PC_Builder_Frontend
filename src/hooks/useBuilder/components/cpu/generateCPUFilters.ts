import { Motherboard } from '../../../../types/components/Motherboard'
import { RAM } from '../../../../types/components/RAM'
import { CPUFilters } from './CPUFilters'

export const generateCPUFilters = (
    ram: RAM | null,
    ramQuantity: number,
    mobo: Motherboard | null,
    gpuQuantity: number
): CPUFilters => {
    const filters: CPUFilters = {}

    if (mobo) {
        filters.socket = mobo.socket
    }

    if (ram) {
        filters.ramCapacity = ram.capacity * ramQuantity
    }

    if (ram ?? mobo) {
        filters.ramType = ram?.type ?? mobo?.ramType
    }

    if (!gpuQuantity) {
        filters.integratedGraphics = true
    }

    return filters
}
