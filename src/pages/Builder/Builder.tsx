import React, { FunctionComponent } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent/SelectComponent'
import { useBuilder } from '../../hooks/useBuilder'
import styles from './Builder.module.scss'

interface Props {}

export const Builder: FunctionComponent<Props> = props => {
    const {
        cpu: { cpuFilters, setCPU, cpu },
        chassis: { chassisFilters, setChassis, chassis },
        gpu: { gpuFilters, setGPU, gpu },
        mobo: { moboFilters, setMobo, mobo },
        ram: { ramFilters, setRam, ramQuantity, decrementRam, incrementRam, ram },
        psu: { psuFilters, setPSU, psu },
        storage: { storageFilters, setStorage, storage }
    } = useBuilder()

    return (
        <div className={styles.root}>
            <h1>Builder</h1>
            <SelectComponent filters={cpuFilters} type='cpu' setComponent={setCPU} />
            <SelectComponent filters={moboFilters} type='motherboard' setComponent={setMobo} />
            <SelectComponent filters={ramFilters} type='ram' setComponent={setRam} />
            <button onClick={incrementRam}>Inc.</button>
            <span>{ramQuantity}</span>
            <button onClick={decrementRam}>Dec.</button>
            <SelectComponent filters={gpuFilters} type='gpu' setComponent={setGPU} />
            <SelectComponent filters={chassisFilters} type='case' setComponent={setChassis} />
            <SelectComponent filters={storageFilters} type='storage' setComponent={setStorage} />
            <SelectComponent filters={psuFilters} type='psu' setComponent={setPSU} />

            <pre>{JSON.stringify(cpu, null, 2)}</pre>
            <pre>{JSON.stringify(mobo, null, 2)}</pre>
            <pre>{JSON.stringify(ram, null, 2)}</pre>
            <pre>{JSON.stringify(gpu, null, 2)}</pre>
            <pre>{JSON.stringify(chassis, null, 2)}</pre>
            <pre>{JSON.stringify(storage, null, 2)}</pre>
            <pre>{JSON.stringify(psu, null, 2)}</pre>
        </div>
    )
}
