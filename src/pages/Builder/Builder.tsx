import React, { FunctionComponent, useCallback, useState } from 'react'
import { SelectComponent } from '../../components/Builder/SelectComponent'
import { SelectCPUComponent } from '../../components/Builder/SelectCPUComponent'
import { ComputerProps } from '../../types/components/ComputerProps'
import styles from './Builder.module.scss'

interface Props {}

export const Builder: FunctionComponent<Props> = props => {
    const [currentType, setCurrentType] = useState<string>('')

    const changeTypeHandler = useCallback((type: string) => {
        setCurrentType(type)
    }, [])

    const [computerProps, setComputerProps] = useState<ComputerProps>({})

    return (
        <div className={styles.root}>
            <h1>Builder</h1>
            <SelectCPUComponent
                setComputerProps={setComputerProps}
                computerProps={computerProps}
                changeTypeHandler={changeTypeHandler}
                currentType={currentType}
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
        </div>
    )
}
