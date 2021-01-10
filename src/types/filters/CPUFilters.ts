import { Filters } from './Filters'

export interface CPUFilters extends Filters {
    generation?: string[]
    series?: string[]
}
