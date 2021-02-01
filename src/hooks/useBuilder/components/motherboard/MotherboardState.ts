import { Motherboard } from '../../../../types/components/Motherboard'
import { MotherboardFilters } from './MotherboardFilters'

export interface MotherboardState {
    setMobo: React.Dispatch<React.SetStateAction<Motherboard | null>>
    moboFilters: MotherboardFilters
}
