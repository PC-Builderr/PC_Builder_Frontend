import { GPU } from '../../../../types/components/GPU'
import { GPUFilters } from './GPUFilters'

interface Methods {
    setGPU: React.Dispatch<React.SetStateAction<GPU | null>>
    addGPU: () => void
    removeGPU: () => void
}

interface State {
    gpuFilters: GPUFilters
    gpuQuantity: number
    gpu: GPU | null
}

export interface GPUState {
    state: State
    methods: Methods
}
