import { GPU } from '../../../../types/components/GPU'
import { Motherboard } from '../../../../types/components/Motherboard'
import { FORMAT_TYPES } from '../../formats/FormatTypes'
import { getCompatileFormats } from '../../formats/getCompatibleFormats'
import { CaseFilters } from './CaseFilters'

export const generateCaseFilters = (gpu: GPU | null, mobo: Motherboard | null): CaseFilters => {
    const filters: CaseFilters = {}

    if (gpu) {
        filters.format = getCompatileFormats(gpu.format, { isCase: true })
    }

    if (mobo) {
        filters.format = getCompatileFormats(mobo.format, { isCase: true })
    }

    if (mobo && gpu) {
        const format: string =
            (FORMAT_TYPES.get(mobo.format) ?? 0) > (FORMAT_TYPES.get(gpu.format) ?? 0)
                ? mobo.format
                : gpu.format

        filters.format = getCompatileFormats(format, { isCase: true })
    }

    return filters
}
