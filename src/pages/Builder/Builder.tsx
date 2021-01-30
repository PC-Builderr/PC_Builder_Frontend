import React, { FunctionComponent, useState } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent/SelectComponent'
import { useBuilder } from '../../hooks/useBuilder'
import { Case } from '../../types/components/Case'
import { GPU } from '../../types/components/GPU'
import { Motherboard } from '../../types/components/Motherboard'
import { PSU } from '../../types/components/PSU'
import { RAM } from '../../types/components/RAM'
import styles from './Builder.module.scss'

interface Props {}

interface CPUFilters {
    socket?: string
    ramType?: string
    ramCapacity?: number
    ramChannels?: number
    integratedGraphics?: boolean
}

const generateCPUFilters = (ram: RAM | null, mobo: Motherboard | null): CPUFilters => {
    let filters: CPUFilters = {}

    if (!ram && !mobo) return filters

    if (mobo) {
        filters.socket = mobo.socket
    }

    if (ram) {
        filters.ramCapacity = ram.capacity
    }

    if (ram || mobo) {
        filters.ramType = ram?.type ?? mobo?.ramType
    }

    return filters
}

export const Builder: FunctionComponent<Props> = props => {
    const [storage, setStorage] = useState<Storage | null>(null)

    const {
        cpu: { cpuFilters, setCPU },
        chassis: { chassisFilters, setChassis },
        gpu: { gpuFilters, setGPU },
        mobo: { moboFilters, setMobo },
        ram: { ramFilters, setRam },
        psu: { psuFilters, setPSU }
    } = useBuilder()

    return (
        <div className={styles.root}>
            <h1>Builder</h1>
            <SelectComponent filters={cpuFilters} type='cpu' setComponent={setCPU} />
            <SelectComponent filters={gpuFilters} type='gpu' setComponent={setGPU} />
            <SelectComponent filters={moboFilters} type='motherboard' setComponent={setMobo} />
            <SelectComponent filters={ramFilters} type='ram' setComponent={setRam} />
            <SelectComponent filters={psuFilters} type='psu' setComponent={setPSU} />
            <SelectComponent filters={chassisFilters} type='case' setComponent={setChassis} />
            <SelectComponent filters={{}} type='storage' setComponent={setStorage} />
        </div>
    )
}
