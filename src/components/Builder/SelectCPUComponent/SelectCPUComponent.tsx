import React, { FunctionComponent, useEffect, useState } from 'react'
import { ComputerProps } from '../../../types/components/ComputerProps'
import { CPU } from '../../../types/components/CPU'
import { ComponentList } from '../SelectComponent/ComponentList'
import styles from './SelectCPUComponent.module.scss'

interface Props {
    currentType: string
    changeTypeHandler: (type: string) => void
    computerProps: ComputerProps
    setComputerProps: React.Dispatch<React.SetStateAction<ComputerProps>>
}

export const SelectCPUComponent: FunctionComponent<Props> = props => {
    const [component, setComponent] = useState<CPU | null>(null)

    return (
        <div className={styles.root}>
            <h3
                onClick={() => {
                    if (props.currentType === 'cpu') {
                        props.changeTypeHandler('')
                        return
                    }
                    props.changeTypeHandler('cpu')
                }}
            >
                cpu
            </h3>
            {'cpu' === props.currentType && <ComponentList type='cpu' />}
        </div>
    )
}
