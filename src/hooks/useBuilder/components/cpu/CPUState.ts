import { CPU } from '../../../../types/components/CPU'
import { CPUFilters } from './CPUFilters'

export interface CPUState {
    cpu: CPU | null
    setCPU: React.Dispatch<React.SetStateAction<CPU | null>>
    cpuFilters: CPUFilters
}
