import { Case } from '../../../../types/components/Case'
import { CPU } from '../../../../types/components/CPU'
import { RAM } from '../../../../types/components/RAM'
import { getCompatileFormats } from '../../formats/getCompatibleFormats'
import { MotherboardFilters } from './MotherboardFilters'

export const generateMotherboardFilters = (
    cpu: CPU | null,
    ram: RAM | null,
    chassis: Case | null
): MotherboardFilters => {
    const filters: MotherboardFilters = {}

    if (cpu) {
        filters.socket = cpu.socket
    }

    if (ram) {
        filters.ramCapacity = ram.capacity
    }

    if (ram ?? cpu) {
        filters.ramType = ram?.type ?? cpu?.ramType
    }

    if (chassis) {
        filters.format = getCompatileFormats(chassis.format)
    }

    return filters
}
