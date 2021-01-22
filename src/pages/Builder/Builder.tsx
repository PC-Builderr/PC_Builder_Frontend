import React, { useCallback, useState } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent'
import { Case } from '../../types/components/Case'
import { CPU } from '../../types/components/CPU'
import { GPU } from '../../types/components/GPU'
import { Motherboard } from '../../types/components/Motherboard'
import { PSU } from '../../types/components/PSU'
import { RAM } from '../../types/components/RAM'
import styles from './Builder.module.scss'

interface Props {}

export const Builder: React.FC<Props> = props => {
    const [currentType, setCurrentType] = useState<string>('')

    const changeTypeHandler = useCallback((type: string) => {
        setCurrentType(type)
    }, [])

    const [cpu, setCPU] = useState<CPU | null>(null)
    const [gpu, setGPU] = useState<GPU | null>(null)
    const [psu, setPSU] = useState<PSU | null>(null)
    const [motherboard, setMotherboard] = useState<Motherboard | null>(null)
    const [storage, setStorage] = useState<Storage | null>(null)
    const [chassis, setChassis] = useState<Case | null>(null)
    const [ram, setRAM] = useState<RAM | null>(null)

    return (
        <div className={styles.root}>
            <h1>Builder</h1>
            <SelectComponent
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
                type='cpu'
            />
            <SelectComponent
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
                type='gpu'
            />
            <SelectComponent
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
                type='motherboard'
            />
            <SelectComponent
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
                type='case'
            />
            <SelectComponent
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
                type='storage'
            />
            <SelectComponent
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
                type='ram'
            />
            <SelectComponent
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
                type='psu'
            />
            <pre>{JSON.stringify(cpu, null, 2)}</pre>
            <pre>{JSON.stringify(gpu, null, 2)}</pre>
            <pre>{JSON.stringify(motherboard, null, 2)}</pre>
            <pre>{JSON.stringify(chassis, null, 2)}</pre>
            <pre>{JSON.stringify(storage, null, 2)}</pre>
            <pre>{JSON.stringify(ram, null, 2)}</pre>
            <pre>{JSON.stringify(psu, null, 2)}</pre>
        </div>
    )
}
