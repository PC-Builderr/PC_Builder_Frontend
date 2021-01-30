import { RAM } from '../../../../types/components/RAM'
import { RamFilters } from './RamFilters'

interface Methods {
    incrementRam: () => void
    decrementRam: () => void
    setRam: React.Dispatch<React.SetStateAction<RAM | null>>
}

export interface RamState {
    ram: RAM | null
    ramQuantity: number
    methods: Methods
    ramFilters: RamFilters
}
