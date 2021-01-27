import React, { FunctionComponent } from 'react'
import { ComponentList } from './ComponentList'
import styles from './SelectComponent.module.scss'

interface Props {
    type: string
    currentType: string
    changeTypeHandler: (type: string) => void
}

export const SelectComponent: FunctionComponent<Props> = props => {
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
