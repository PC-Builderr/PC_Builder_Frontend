import { GPU } from '../../../../types/components/GPU'
import { GPUFilters } from './GPUFilters'

export interface GPUState {
    gpu: GPU | null
    setGPU: React.Dispatch<React.SetStateAction<GPU | null>>
    gpuFilters: GPUFilters
}
