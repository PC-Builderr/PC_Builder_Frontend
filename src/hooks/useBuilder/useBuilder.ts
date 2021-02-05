import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { generateComputerStorages } from './components/storage/generateComputerStorages'
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
    const [name, setName] = useState<string>('')

    // Components and components quantities
    const [cpu, setCPU] = useState<CPU | null>(null)
    const [gpu, setGPU] = useState<GPU | null>(null)
    const [gpuQuantity, setGPUQuantity] = useState<number>(1)
    const [mobo, setMobo] = useState<Motherboard | null>(null)
    const [ram, setRam] = useState<RAM | null>(null)
    const [ramQuantity, setRamQuantity] = useState<number>(1)
    const [chassis, setChassis] = useState<Case | null>(null)
    const [psu, setPSU] = useState<PSU | null>(null)
    const [storages, setStorages] = useState<Array<Storage | null>>([null])

    //Component computed filters
    const cpuFilters: CPUFilters = useMemo(
        () => generateCPUFilters(ram, ramQuantity, mobo, gpuQuantity),
        [ram, mobo, ramQuantity, gpuQuantity]
    )
    const gpuFilters: GPUFilters = useMemo(() => generateGPUFilters(chassis), [chassis])
    const chassisFilters: CaseFilters = useMemo(() => generateCaseFilters(gpu, mobo), [gpu, mobo])
    const ramFilters: RamFilters = useMemo(() => generateRamFilters(cpu, mobo), [cpu, mobo])
    const moboFilters: MotherboardFilters = useMemo(
        () => generateMotherboardFilters(cpu, ram, ramQuantity, chassis, storages),
        [cpu, ram, chassis, storages, ramQuantity]
    )
    const psuFilters: PSUFilters = useMemo(
        () => generatePSUFilters(cpu, ...new Array(ramQuantity).fill(ram), gpu, mobo, ...storages),
        [cpu, ram, gpu, mobo, storages, ramQuantity]
    )
    const storageFilters: StorageFilters[] = useMemo(() => generateStorageFilters(mobo, storages), [
        mobo,
        storages
    ])

    //Computer component
    const computer = useMemo(() => {
        const computerStorages: Array<Component | null> = generateComputerStorages(storages)

        const computer: Computer = {
            name,
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

        return computer
    }, [cpu, gpu, mobo, ram, psu, chassis, storages, ramQuantity, gpuQuantity, name])

    // Computer price
    const price: number = useMemo(
        () =>
            generateComputerPrice(
                cpu,
                gpu,
                mobo,
                ...new Array(ramQuantity).fill(ram),
                psu,
                chassis,
                ...storages
            ),
        [cpu, gpu, mobo, ram, psu, chassis, storages, ramQuantity]
    )

    //GPU Functions
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

    // Storage Functions
    const addStorage = useCallback(() => {
        if (!mobo) return

        if (Math.max(mobo.sataPorts, mobo.sataPorts) === storages.length) return

        setStorages(
            (storages: Array<Storage | null>): Array<Storage | null> => {
                return [...storages, null]
            }
        )
    }, [mobo, storages.length])

    const removeStorage = useCallback(() => {
        if (storages.length === 1) return

        setStorages(
            (storages: Array<Storage | null>): Array<Storage | null> => {
                return storages.slice(0, -1)
            }
        )
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

    // RAM Functions
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

    // Effects
    useEffect(() => {
        setRamQuantity(1)
    }, [ram])

    useEffect(() => {
        setStorages((storages: Array<Storage | null>): Array<Storage | null> => [storages[0]])
    }, [mobo])

    return {
        cpu: {
            setCPU,
            cpuFilters
        },
        gpu: {
            state: {
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
            setChassis,
            chassisFilters
        },
        mobo: {
            setMobo,
            moboFilters
        },
        ram: {
            state: {
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
            setPSU,
            psuFilters
        },
        storage: {
            state: {
                storageFilters
            },
            methods: {
                addStorage,
                removeStorage,
                setStorage
            }
        },
        computer: {
            setName,
            price,
            computer
        }
    }
}
