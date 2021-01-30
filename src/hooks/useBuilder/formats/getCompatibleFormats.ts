import { FORMAT_TYPES } from './FormatTypes'

interface Options {
    isCase: boolean
}

export const getCompatileFormats = (
    format: string,
    options: Options = { isCase: false }
): string[] => {
    const formatValue: number = FORMAT_TYPES.get(format) ?? 1

    const compatibleFormats: string[] = []

    FORMAT_TYPES.forEach((value: number, key: string) => {
        if (options.isCase) {
            if (formatValue <= value) {
                compatibleFormats.push(key)
            }
            return
        }
        if (formatValue >= value) {
            compatibleFormats.push(key)
        }
    })

    return compatibleFormats
}
