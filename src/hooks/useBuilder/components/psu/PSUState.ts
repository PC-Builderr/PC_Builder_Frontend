import { PSU } from '../../../../types/components/PSU'
import { PSUFilters } from './PSUFilters'

export interface PSUState {
    psu: PSU | null
    setPSU: React.Dispatch<React.SetStateAction<PSU | null>>
    psuFilters: PSUFilters
}
