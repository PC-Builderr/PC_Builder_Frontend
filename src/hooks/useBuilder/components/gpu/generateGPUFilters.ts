import { Case } from '../../../../types/components/Case'
import { getCompatileFormats } from '../../formats/getCompatibleFormats'
import { GPUFilters } from './GPUFilters'

export const generateGPUFilters = (chassis: Case | null): GPUFilters => {
    const filters: GPUFilters = {}

    if (chassis) {
        filters.format = getCompatileFormats(chassis.format)
    }

    return filters
}
