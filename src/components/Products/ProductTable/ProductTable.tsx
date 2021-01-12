import React from 'react'
import { CPUProductTable } from './CPUProductTable'
import { CaseProductTable } from './CaseProductTable'

interface Props {
    type: string
    component: any
}

export const ProductTable: React.FC<Props> = props => {
    switch (props.type) {
        case 'cpu':
            return <CPUProductTable component={props.component} />
        case 'case':
            return <CaseProductTable component={props.component} />
        default:
            return <pre>{JSON.stringify(props.component, null, 2)}</pre>
    }
}
