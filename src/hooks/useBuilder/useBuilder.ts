import { useCallback, useEffect, useState } from 'react'
import { Case } from '../../types/components/Case'
import { CPU } from '../../types/components/CPU'
import { GPU } from '../../types/components/GPU'
import { Motherboard } from '../../types/components/Motherboard'
import { PSU } from '../../types/components/PSU'
import { RAM } from '../../types/components/RAM'
import { Storage } from '../../types/components/Storage'
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
import { Component } from './computer/Component'
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
    const [gpuQuantity, setGPUQuantity] = useState<number>(1)

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
        storages: [null],
        gpu: null
    })
    const [price, setPrice] = useState<number>(0)

    const addGPU = useCallback(() => {
        setGPUQuantity(1)
    }, [])

    const removeGPU = useCallback(() => {
        if (!gpuQuantity) return

        if (cpu && !cpu.integratedGraphics) {
            alert('current CPU has no integrated graphics please choose a diffrent one')
            setCPU(null)
        }
        setGPU(null)
        setGPUQuantity(0)
    }, [cpu, gpuQuantity])

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
        if (storages.length === 1) return

        setStorages(
            (storages: Array<Storage | null>): Array<Storage | null> => {
                return storages.slice(0, -1)
            }
        )
        setStorageFilters((filters: StorageFilters[]): StorageFilters[] => {
            return filters.slice(0, -1)
        })
    }, [storages.length])

    const setStorage = useCallback((index: number, storage: Storage | null) => {
        setStorages(
            (storages: Array<Storage | null>): Array<Storage | null> => [
                ...storages.slice(0, index),
                storage,
                ...storages.slice(index + 1)
            ]
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
    }, [cpu, mobo, ram, ramQuantity])

    const decrementRam = useCallback(() => {
        if (ramQuantity === 1) return

        setRamQuantity((quantity: number): number => quantity - 1)
    }, [ramQuantity])

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

        const computerStorages: Array<Component | null> = storages.reduce(
            (
                storages: Array<Component | null>,
                storage: Storage | null
            ): Array<Component | null> => {
                const computerStorage: Component | null =
                    storages.find(
                        (component: Component | null) => component?.productId === storage?.productId
                    ) ?? null

                if (computerStorage) {
                    return [
                        ...storages.filter(
                            (component: Component | null) =>
                                component?.productId !== computerStorage.productId
                        ),
                        {
                            productId: computerStorage.productId,
                            quantity: computerStorage.quantity + 1
                        }
                    ]
                }

                if (storage) {
                    return [...storages, { productId: storage.productId, quantity: 1 }]
                }

                return [...storages, null]
            },
            []
        )

        const computer: Computer = {
            cpuId: cpu?.productId ?? null,
            caseId: chassis?.productId ?? null,
            motherboardId: mobo?.productId ?? null,
            psuId: psu?.productId ?? null,
            storages: computerStorages,
            ram: ram
                ? {
                      productId: ram?.productId,
                      quantity: ramQuantity
                  }
                : null
        }

        if (gpuQuantity) {
            computer.gpu = gpu
                ? {
                      productId: gpu.productId,
                      quantity: gpuQuantity
                  }
                : null
        }

        setComputer(computer)
    }, [cpu, gpu, mobo, ram, psu, chassis, storages, ramQuantity, gpuQuantity])

    useEffect(() => {
        setRamQuantity(1)
    }, [ram])

    useEffect(() => {
        setStorages((storages: Array<Storage | null>): Array<Storage | null> => [storages[0]])
    }, [mobo])

    useEffect(() => {
        setCPUFilters(generateCPUFilters(ram, ramQuantity, mobo, gpuQuantity))
    }, [ram, mobo, ramQuantity, gpuQuantity])

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
        setPSUFilters(
            generatePSUFilters(cpu, ...new Array(ramQuantity).fill(ram), gpu, mobo, ...storages)
        )
    }, [cpu, ram, gpu, mobo, storages, ramQuantity])

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
            state: {
                gpu,
                gpuFilters,
                gpuQuantity
            },
            methods: {
                setGPU,
                addGPU,
                removeGPU
            }
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
            state: {
                ram,
                ramQuantity,
                ramFilters
            },
            methods: {
                incrementRam,
                decrementRam,
                setRam
            }
        },
        psu: {
            psu,
            setPSU,
            psuFilters
        },
        storage: {
            state: {
                storages,
                storageFilters
            },
            methods: {
                addStorage,
                removeStorage,
                setStorage
            }
        },
        computer: {
            price,
            computer
        }
    }
}
