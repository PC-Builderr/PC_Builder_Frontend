import { Storage } from '../../../../types/components/Storage'
import { StorageFilters } from './StorageFilters'

interface Methods {
    addStorage: () => void
    removeStorage: () => void
    setStorage: (index: number, storage: Storage | null) => void
}

export interface StorageState {
    storages: Array<Storage | null>
    methods: Methods
    storageFilters: StorageFilters[]
}
