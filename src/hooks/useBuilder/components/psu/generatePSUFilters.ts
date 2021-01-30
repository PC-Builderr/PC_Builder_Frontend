import { PSUFilters } from './PSUFilters'

interface PCC {
    consumption: number
}

export const generatePSUFilters = (...args: Array<PCC | null>): PSUFilters => {
    const filters: PSUFilters = {}

    filters.power = args.reduce(
        (total: number, component: PCC | null): number => total + (component?.consumption ?? 0),
        0
    )

    return filters
}
