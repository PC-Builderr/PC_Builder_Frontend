import React, { FunctionComponent, useCallback, useState } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent/SelectComponent'
import { useBuilder } from '../../hooks/useBuilder'
import styles from './Builder.module.scss'

interface Props {}

export const Builder: FunctionComponent<Props> = props => {
    const {
        cpu: { cpuFilters, setCPU },
        chassis: { chassisFilters, setChassis },
        gpu: { gpuFilters, setGPU },
        mobo: { moboFilters, setMobo },
        ram: { ramFilters, setRam, ramQuantity, decrementRam, incrementRam },
        psu: { psuFilters, setPSU },
        storage: { storageFilters, setStorage }
    } = useBuilder()

    return (
        <div className={styles.root}>
            <h1>Builder</h1>
            <SelectComponent filters={cpuFilters} type='cpu' setComponent={setCPU} />
            <SelectComponent filters={gpuFilters} type='gpu' setComponent={setGPU} />
            <SelectComponent filters={moboFilters} type='motherboard' setComponent={setMobo} />
            <SelectComponent filters={ramFilters} type='ram' setComponent={setRam} />
            <button onClick={incrementRam}>Inc.</button>
            <span>{ramQuantity}</span>
            <button onClick={decrementRam}>Dec.</button>
            <SelectComponent filters={psuFilters} type='psu' setComponent={setPSU} />
            <SelectComponent filters={chassisFilters} type='case' setComponent={setChassis} />
            <SelectComponent filters={storageFilters} type='storage' setComponent={setStorage} />
        </div>
    )
}
