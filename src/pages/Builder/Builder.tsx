import React, { FunctionComponent } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent/SelectComponent'
import { useBuilder } from '../../hooks/useBuilder'
import { Storage } from '../../types/components/Storage'
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
        storage: {
            storageFilters,
            methods: { addStorage, removeStorage, setStorage },
            storages
        }
    } = useBuilder()

    return (
        <div className={styles.root}>
            <h1>Builder</h1>
            <SelectComponent id='cpu' filters={cpuFilters} type='cpu' setComponent={setCPU} />
            <SelectComponent
                id='motherboard'
                filters={moboFilters}
                type='motherboard'
                setComponent={setMobo}
            />
            <SelectComponent id='ram' filters={ramFilters} type='ram' setComponent={setRam} />
            <button onClick={incrementRam}>Inc.</button>
            <span>{ramQuantity}</span>
            <button onClick={decrementRam}>Dec.</button>
            <SelectComponent id='gpu' filters={gpuFilters} type='gpu' setComponent={setGPU} />
            <SelectComponent
                id='case'
                filters={chassisFilters}
                type='case'
                setComponent={setChassis}
            />
            {storages?.map((storage: Storage | null, index: number) => {
                return (
                    <SelectComponent
                        key={index}
                        id={`storage${index}`}
                        filters={storageFilters[index]}
                        type='storage'
                        setComponent={(storage: Storage | null) => setStorage(index, storage)}
                    />
                )
            })}
            <button onClick={addStorage}>add</button>
            <button onClick={removeStorage}>remove</button>
            <SelectComponent id='psu' filters={psuFilters} type='psu' setComponent={setPSU} />
        </div>
    )
}
