import { CPU } from '../../../../types/components/CPU'
import { Motherboard } from '../../../../types/components/Motherboard'
import { RamFilters } from './RamFilters'

export const generateRamFilters = (cpu: CPU | null, mobo: Motherboard | null): RamFilters => {
    const filters: RamFilters = {}

    if (cpu ?? mobo) {
        filters.type = cpu?.ramType ?? mobo?.ramType
        filters.capacity = cpu?.ramCapacity ?? mobo?.ramCapacity
    }

    if (cpu && mobo) {
        filters.capacity = cpu.ramCapacity > mobo.ramCapacity ? mobo.ramCapacity : cpu.ramCapacity
    }

    return filters
}
