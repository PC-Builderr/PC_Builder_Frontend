import { useCallback, useEffect, useState } from 'react'
import { Case } from '../../types/components/Case'
import { CPU } from '../../types/components/CPU'
import { GPU } from '../../types/components/GPU'
import { Motherboard } from '../../types/components/Motherboard'
import { PSU } from '../../types/components/PSU'
import { RAM } from '../../types/components/RAM'
import { Storage } from '../../types/components/Storage'
import { useFetchCreateComputer } from '../HTTP/useFetchCreateComputer'
import { CaseFilters } from './components/case/CaseFilters'
import { CaseState } from './components/case/CaseState'
import { generateCaseFilters } from './components/case/generateCaseFilters'
import { CPUFilters } from './components/cpu/CPUFilters'
import { CPUState } from './components/cpu/CPUState'
import { generateCPUFilters } from './components/cpu/generateCPUFilters'
import { generateGPUFilters } from './components/gpu/generateGPUFilters'
import { GPUFilters } from './components/gpu/GPUFilters'
import { GPUState } from './components/gpu/GPUState'
import { generateMotherboardFilters } from './components/motherboard/generateMotherboardFilters'
import { MotherboardFilters } from './components/motherboard/MotherboardFilters'
import { MotherboardState } from './components/motherboard/MotherboardState'
import { generatePSUFilters } from './components/psu/generatePSUFilters'
import { PSUFilters } from './components/psu/PSUFilters'
import { PSUState } from './components/psu/PSUState'
import { generateRamFilters } from './components/ram/generateRamFilters'
import { RamFilters } from './components/ram/RamFilters'
import { RamState } from './components/ram/RamState'
import { generateStorageFilters } from './components/storage/generateStorageFilters'
import { StorageFilters } from './components/storage/StorageFilters'
import { StorageState } from './components/storage/StorageState'
import { Computer } from './computer/Computer'
import { ComputerState } from './computer/ComputerState'
import { generateComputerPrice } from './computer/generateComputerPrice'

interface Builder {
    cpu: CPUState
    gpu: GPUState
    chassis: CaseState
    mobo: MotherboardState
    ram: RamState
    psu: PSUState
    storage: StorageState
    computer: ComputerState
}

export const useBuilder = (): Builder => {
    const [cpu, setCPU] = useState<CPU | null>(null)
    const [cpuFilters, setCPUFilters] = useState<CPUFilters>({})

    const [gpu, setGPU] = useState<GPU | null>(null)
    const [gpuFilters, setGPUFilters] = useState<GPUFilters>({})

    const [mobo, setMobo] = useState<Motherboard | null>(null)
    const [moboFilters, setMoboFilters] = useState<MotherboardFilters>({})

    const [ram, setRam] = useState<RAM | null>(null)
    const [ramFilters, setRamFilters] = useState<RamFilters>({})
    const [ramQuantity, setRamQuantity] = useState<number>(1)

    const [chassis, setChassis] = useState<Case | null>(null)
    const [chassisFilters, setChassisFilters] = useState<CaseFilters>({})

    const [psu, setPSU] = useState<PSU | null>(null)
    const [psuFilters, setPSUFilters] = useState<PSUFilters>({})

    const [storages, setStorages] = useState<Array<Storage | null>>([null])
    const [storageFilters, setStorageFilters] = useState<StorageFilters[]>([{}])

    const [computer, setComputer] = useState<Computer>({
        cpuId: null,
        caseId: null,
        motherboardId: null,
        psuId: null,
        ram: null,
        storageIds: [null],
        gpuId: null
    })
    const [price, setPrice] = useState<number>(0)

    const addStorage = useCallback(() => {
        if (!mobo) return

        if (Math.max(mobo.sataPorts, mobo.sataPorts) === storages.length) return

        setStorages(
            (storages: Array<Storage | null>): Array<Storage | null> => {
                return [...storages, null]
            }
        )
        setStorageFilters((filters: StorageFilters[]): StorageFilters[] => {
            return [...filters, {}]
        })
    }, [mobo, storages.length])

    const removeStorage = useCallback(() => {
        setStorages(
            (storages: Array<Storage | null>): Array<Storage | null> => {
                const newStorages: Array<Storage | null> = [...storages]
                if (newStorages.length > 1) {
                    newStorages.pop()
                }
                return newStorages
            }
        )
        setStorageFilters((filters: StorageFilters[]): StorageFilters[] => {
            const newFilters: StorageFilters[] = [...filters]
            if (newFilters.length > 1) {
                newFilters.pop()
            }
            return newFilters
        })
    }, [])

    const setStorage = useCallback((index: number, storage: Storage | null) => {
        setStorages(
            (storages: Array<Storage | null>): Array<Storage | null> => {
                const newStorages: Array<Storage | null> = [...storages]
                newStorages[index] = storage
                return newStorages
            }
        )
    }, [])

    const incrementRam = useCallback(() => {
        if (!mobo) return

        if (mobo && ramQuantity === mobo.ramSlots) return

        if (cpu && ramQuantity === cpu.ramChannels * 2) return

        if (!ram) return

        if (cpu && ram.capacity * ramQuantity > cpu.ramCapacity) return

        if (mobo && ram.capacity * ramQuantity > mobo.ramCapacity) return

        setRamQuantity((quantity: number): number => quantity + 1)
    }, [cpu, mobo, ram, ramQuantity, setRamQuantity])

    const decrementRam = useCallback(() => {
        if (ramQuantity === 1) {
            return
        }

        setRamQuantity((quantity: number): number => quantity - 1)
    }, [ramQuantity, setRamQuantity])

    useEffect(() => {
        setPrice(
            generateComputerPrice(
                cpu,
                gpu,
                mobo,
                ...new Array(ramQuantity).fill(ram),
                psu,
                chassis,
                ...storages
            )
        )
        const storageIds: Array<number | null> = storages.map(
            (storage: Storage | null) => storage?.productId || null
        )

        setComputer({
            cpuId: cpu?.productId ?? null,
            caseId: chassis?.productId ?? null,
            motherboardId: mobo?.productId ?? null,
            psuId: psu?.productId ?? null,
            storageIds,
            ram: ram
                ? {
                      productId: ram?.productId,
                      quantity: ramQuantity
                  }
                : null,
            gpuId: gpu?.productId ?? null
        })
    }, [cpu, gpu, mobo, ram, psu, chassis, storages, ramQuantity])

    useEffect(() => {
        setRamQuantity(1)
    }, [ram])

    useEffect(() => {
        setStorages((storages: Array<Storage | null>): Array<Storage | null> => [storages[0]])
    }, [mobo])

    useEffect(() => {
        setCPUFilters(generateCPUFilters(ram, ramQuantity, mobo))
    }, [ram, mobo, ramQuantity])

    useEffect(() => {
        setGPUFilters(generateGPUFilters(chassis))
    }, [chassis])

    useEffect(() => {
        setChassisFilters(generateCaseFilters(gpu, mobo))
    }, [gpu, mobo])

    useEffect(() => {
        setMoboFilters(generateMotherboardFilters(cpu, ram, ramQuantity, chassis, storages))
    }, [cpu, ram, chassis, storages, ramQuantity])

    useEffect(() => {
        setRamFilters(generateRamFilters(cpu, mobo))
    }, [cpu, mobo])

    useEffect(() => {
        setPSUFilters(generatePSUFilters(cpu, ram, gpu, mobo, ...storages))
    }, [cpu, ram, gpu, mobo, storages])

    useEffect(() => {
        setStorageFilters(generateStorageFilters(mobo, storages))
    }, [mobo, storages])

    return {
        cpu: {
            cpu,
            setCPU,
            cpuFilters
        },
        gpu: {
            gpu,
            setGPU,
            gpuFilters
        },
        chassis: {
            chassis,
            setChassis,
            chassisFilters
        },
        mobo: {
            mobo,
            setMobo,
            moboFilters
        },
        ram: {
            ram,
            ramQuantity,
            methods: {
                incrementRam,
                decrementRam,
                setRam
            },
            ramFilters
        },
        psu: {
            psu,
            setPSU,
            psuFilters
        },
        storage: {
            storages,
            methods: {
                addStorage,
                removeStorage,
                setStorage
            },
            storageFilters
        },
        computer: {
            price,
            computer
        }
    }
}
