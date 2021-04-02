import { FormControlLabel, Switch, TextField } from '@material-ui/core'
import React, { FunctionComponent, useCallback } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent/SelectComponent'
import { Button } from '../../components/UI/Button/Button'
import { Header } from '../../components/UI/Header'
import { Input } from '../../components/UI/Input'
import { useFetchCreateComputer } from '../../hooks/HTTP/useFetchCreateComputer'
import { useBuilder } from '../../hooks/useBuilder'
import { StorageFilters } from '../../hooks/useBuilder/components/storage/StorageFilters'
import { useCart } from '../../hooks/useCart'
import { CartItem } from '../../types/cart/CartEntry'
import { Storage } from '../../types/components/Storage'
import styles from './Builder.module.scss'

interface Props {}

export const Builder: FunctionComponent<Props> = props => {
    const {
        methods: { addItem }
    } = useCart()

    const {
        cpu: { cpuFilters, setCPU, cpu },
        chassis: { chassisFilters, setChassis, chassis },
        gpu: {
            methods: { addGPU, removeGPU, setGPU },
            state: { gpuFilters, gpuQuantity, gpu }
        },
        mobo: { moboFilters, setMobo, mobo },
        psu: { psuFilters, setPSU, psu },
        ram: {
            state: { ramFilters, ramQuantity, ram },
            methods: { decrementRam, incrementRam, setRam }
        },
        storage: {
            state: { storageFilters, storages },
            methods: { addStorage, removeStorage, setStorage }
        },
        computer: { price, computer, setName }
    } = useBuilder()

    const {
        methods: { createComputer },
        state: { data, loading, disabled }
    } = useFetchCreateComputer(computer)

    return (
        <div className={styles.root}>
            <Header>Builder</Header>
            <TextField
                variant='outlined'
                value={computer.name}
                onChange={e => setName(e.target.value)}
                label='Name'
            />
            <h3>Price: {price}лв.</h3>
            <FormControlLabel
                control={
                    <Switch
                        checked={Boolean(gpuQuantity)}
                        onChange={(_, checked: boolean) => {
                            if (checked) {
                                addGPU()
                                return
                            }
                            removeGPU()
                        }}
                        name='GPU'
                        color='primary'
                    />
                }
                label='Graphics card'
            />
            <SelectComponent
                component={cpu}
                id='cpu'
                filters={cpuFilters}
                type='cpu'
                setComponent={setCPU}
            />
            <SelectComponent
                component={mobo}
                id='motherboard'
                filters={moboFilters}
                type='motherboard'
                setComponent={setMobo}
            />
            <SelectComponent
                component={ram}
                id='ram'
                filters={ramFilters}
                type='ram'
                setComponent={setRam}
            />
            <button onClick={incrementRam}>Inc.</button>
            <span>{ramQuantity}</span>
            <button onClick={decrementRam}>Dec.</button>
            {gpuQuantity > 0 && (
                <SelectComponent
                    component={gpu}
                    id='gpu'
                    filters={gpuFilters}
                    type='gpu'
                    setComponent={setGPU}
                />
            )}

            <SelectComponent
                component={chassis}
                id='case'
                filters={chassisFilters}
                type='case'
                setComponent={setChassis}
            />
            {storageFilters?.map((storageFilter: StorageFilters, index: number) => (
                <SelectComponent
                    component={storages[index]}
                    key={index}
                    id={`storage${index}`}
                    filters={storageFilter}
                    type='storage'
                    setComponent={(storage: Storage | null) => setStorage(index, storage)}
                />
            ))}
            <button onClick={addStorage}>add</button>
            <button onClick={removeStorage}>remove</button>
            <SelectComponent
                component={psu}
                id='psu'
                filters={psuFilters}
                type='psu'
                setComponent={setPSU}
            />
            <Button onClick={createComputer} disabled={disabled} loading={String(loading)}>
                Save Your Configuration
            </Button>
        </div>
    )
}
