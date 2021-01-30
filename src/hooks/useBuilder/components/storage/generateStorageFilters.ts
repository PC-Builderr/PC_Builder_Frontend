import { M2_TYPE, SATA_TYPE } from '../../../../constants'
import { Motherboard } from '../../../../types/components/Motherboard'
import { StorageFilters } from './StorageFilters'

export const generateStorageFilters = (mobo: Motherboard | null): StorageFilters => {
    const filters: StorageFilters = {}

    filters.type = [SATA_TYPE, M2_TYPE]

    if (mobo && mobo.m2Ports === 0) {
        filters.type = [SATA_TYPE]
    }

    return filters
}
