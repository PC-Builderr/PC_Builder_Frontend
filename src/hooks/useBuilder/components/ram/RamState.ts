import { RAM } from '../../../../types/components/RAM'
import { RamFilters } from './RamFilters'

export interface RamState {
    ram: RAM | null
    ramQuantity: number
    incrementRam: () => void
    decrementRam: () => void
    setRam: React.Dispatch<React.SetStateAction<RAM | null>>
    ramFilters: RamFilters
}
