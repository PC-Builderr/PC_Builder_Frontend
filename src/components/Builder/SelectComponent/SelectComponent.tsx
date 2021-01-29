import React, { FunctionComponent, useState } from 'react'
import { Component } from '../../../types/components/Component'
import { ComponentList } from './ComponentList'
import styles from './SelectComponent.module.scss'

interface Props {
    type: string
    currentType: string
    changeTypeHandler: (type: string) => void
}

export const SelectComponent: FunctionComponent<Props> = props => {
    const [component, setComponent] = useState<Component | null>(null)

    return (
        <div className={styles.root}>
            <h3
                onClick={() => {
                    if (props.currentType === props.type) {
                        props.changeTypeHandler('')
                        return
                    }
                    props.changeTypeHandler(props.type)
                }}
            >
                {props.type}
            </h3>
            {props.type === props.currentType && <ComponentList type={props.type} />}
        </div>
    )
}
