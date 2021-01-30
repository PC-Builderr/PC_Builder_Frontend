interface Component {
    productId: number
    quantity: number
}

export interface Computer {
    cpuId: number | null
    gpuId: number | null
    ram: Component | null
    motherboardId: number | null
    storageIds: Array<number | null>
    caseId: number | null
    psuId: number | null
}
