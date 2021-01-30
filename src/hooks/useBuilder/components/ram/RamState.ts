import { RAM } from '../../../../types/components/RAM'
import { RamFilters } from './RamFilters'

export interface RamState {
    ram: RAM | null
    setRam: React.Dispatch<React.SetStateAction<RAM | null>>
    ramFilters: RamFilters
}
