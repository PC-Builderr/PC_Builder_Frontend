import { CPU } from '../../../../types/components/CPU'
import { CPUFilters } from './CPUFilters'

export interface CPUState {
    setCPU: React.Dispatch<React.SetStateAction<CPU | null>>
    cpuFilters: CPUFilters
    cpu: CPU | null
}
