import { RAM } from '../../../../types/components/RAM'
import { RamFilters } from './RamFilters'

interface Methods {
    incrementRam: () => void
    decrementRam: () => void
    setRam: React.Dispatch<React.SetStateAction<RAM | null>>
}

interface State {
    ramQuantity: number
    ramFilters: RamFilters
    ram: RAM | null
}

export interface RamState {
    state: State
    methods: Methods
}
