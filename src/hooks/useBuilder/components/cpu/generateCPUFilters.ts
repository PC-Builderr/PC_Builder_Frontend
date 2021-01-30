import { Motherboard } from '../../../../types/components/Motherboard'
import { RAM } from '../../../../types/components/RAM'
import { CPUFilters } from './CPUFilters'

export const generateCPUFilters = (ram: RAM | null, mobo: Motherboard | null): CPUFilters => {
    const filters: CPUFilters = {}

    if (mobo) {
        filters.socket = mobo.socket
    }

    if (ram) {
        filters.ramCapacity = ram.capacity
    }

    if (ram ?? mobo) {
        filters.ramType = ram?.type ?? mobo?.ramType
    }

    return filters
}
