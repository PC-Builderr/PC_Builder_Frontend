import { Storage } from '../../../../types/components/Storage'
import { StorageFilters } from './StorageFilters'

interface Methods {
    addStorage: () => void
    removeStorage: () => void
    setStorage: (index: number, storage: Storage | null) => void
}

interface State {
    storageFilters: StorageFilters[]
    storages: Array<Storage | null>
}

export interface StorageState {
    state: State
    methods: Methods
}
