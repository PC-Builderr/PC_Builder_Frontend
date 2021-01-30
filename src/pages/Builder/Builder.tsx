import React, { FunctionComponent } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent/SelectComponent'
import { Button } from '../../components/UI/Button/Button'
import { useFetchCreateComputer } from '../../hooks/HTTP/useFetchCreateComputer'
import { useBuilder } from '../../hooks/useBuilder'
import { Storage } from '../../types/components/Storage'
import styles from './Builder.module.scss'

interface Props {}

export const Builder: FunctionComponent<Props> = props => {
    const {
        cpu: { cpuFilters, setCPU },
        chassis: { chassisFilters, setChassis },
        gpu: { gpuFilters, setGPU },
        mobo: { moboFilters, setMobo },
        psu: { psuFilters, setPSU },
        ram: {
            ramFilters,
            methods: { decrementRam, incrementRam, setRam },
            ramQuantity
        },
        storage: {
            storageFilters,
            methods: { addStorage, removeStorage, setStorage },
            storages
        },
        computer: { price, computer }
    } = useBuilder()

    const {
        methods: { createComputer },
        state: { data, error, loading, disabled }
    } = useFetchCreateComputer(computer)

    return (
        <div className={styles.root}>
            <h1>Builder</h1>
            <h3>Price: {price}лв.</h3>
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
            {storages?.map((_: Storage | null, index: number) => {
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
            <Button onClick={createComputer} disabled={disabled} loading={String(loading)}>
                Add To Cart
            </Button>
        </div>
    )
}
