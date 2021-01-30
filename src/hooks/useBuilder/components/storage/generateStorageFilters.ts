import { M2_TYPE, SATA_TYPE } from '../../../../constants'
import { Motherboard } from '../../../../types/components/Motherboard'
import { Storage } from '../../../../types/components/Storage'
import { StorageFilters } from './StorageFilters'

export const generateStorageFilters = (
    mobo: Motherboard | null,
    storages: Array<Storage | null>
): StorageFilters[] => {
    let filters: StorageFilters[] = new Array(storages.length).fill({})

    if (!mobo) {
        return filters
    }

    filters = filters.map((_: StorageFilters, index: number) => {
        const filter: StorageFilters = { type: [] }
        console.log(index)
        if (mobo.sataPorts > index) {
            filter.type!.push(SATA_TYPE)
        }

        if (mobo.m2Ports > index) {
            filter.type!.push(M2_TYPE)
        }

        return filter
    })

    return filters
}
