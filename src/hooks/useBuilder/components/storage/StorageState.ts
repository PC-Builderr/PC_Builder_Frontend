import { Storage } from '../../../../types/components/Storage'
import { StorageFilters } from './StorageFilters'

export interface StorageState {
    storage: Storage | null
    setStorage: React.Dispatch<React.SetStateAction<Storage | null>>
    storageFilters: StorageFilters
}
