import { M2_TYPE } from '../../../../constants'
import { Case } from '../../../../types/components/Case'
import { CPU } from '../../../../types/components/CPU'
import { RAM } from '../../../../types/components/RAM'
import { Storage } from '../../../../types/components/Storage'
import { getCompatileFormats } from '../../formats/getCompatibleFormats'
import { MotherboardFilters } from './MotherboardFilters'

export const generateMotherboardFilters = (
    cpu: CPU | null,
    ram: RAM | null,
    ramQuantity: number,
    chassis: Case | null,
    storages: Array<Storage | null>
): MotherboardFilters => {
    const filters: MotherboardFilters = {}

    filters.ramSlots = ramQuantity

    if (cpu) {
        filters.socket = cpu.socket
    }

    if (ram) {
        filters.ramCapacity = ram.capacity * ramQuantity
    }

    if (ram ?? cpu) {
        filters.ramType = ram?.type ?? cpu?.ramType
    }

    if (chassis) {
        filters.format = getCompatileFormats(chassis.format)
    }

    storages.forEach((storage: Storage | null) => {
        if (storage?.type === M2_TYPE) {
            filters.m2Ports = (filters.m2Ports ?? 0) + 1
            return
        }
        filters.sataPorts = (filters.sataPorts ?? 0) + 1
    })

    return filters
}
