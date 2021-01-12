import React from 'react'
import { CPUProductTable } from './CPUProductTable'
import { CaseProductTable } from './CaseProductTable'
import { GPUProductTable } from './GPUProductTable'
import { PSUProductTable } from './PSUProductTable'
import { StorageProductTable } from './StorageProductTable'
import { MotherboardProductTable } from './MotherboardProductTable'
import { RAMProductTable } from './RAMProductTable'

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
        case 'gpu':
            return <GPUProductTable component={props.component} />
        case 'motherboard':
            return <MotherboardProductTable component={props.component} />
        case 'ram':
            return <RAMProductTable component={props.component} />
        case 'storage':
            return <StorageProductTable component={props.component} />
        case 'psu':
            return <PSUProductTable component={props.component} />
        default:
            return <pre>{JSON.stringify(props.component, null, 2)}</pre>
    }
}
