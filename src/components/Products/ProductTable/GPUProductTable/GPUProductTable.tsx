import React from 'react'
import { GPU } from '../../../../types/components/GPU'
import styles from '../index.module.scss'

interface Props {
    component: GPU
}

export const GPUProductTable: React.FC<Props> = ({ component }) => {
    return (
        <table className={styles.root}>
            <tbody>
                <tr>
                    <th>Series:</th>
                    <td>{component.series}</td>
                </tr>
                <tr>
                    <th>Brand:</th>
                    <td>{component.product.brand.name}</td>
                </tr>
                <tr>
                    <th>Speed:</th>
                    <td>{component.speed} MHz</td>
                </tr>
                <tr>
                    <th>Memory:</th>
                    <td>{component.memory} GB</td>
                </tr>
                <tr>
                    <th>Memory type:</th>
                    <td>{component.memoryType}</td>
                </tr>
                <tr>
                    <th>Bus width:</th>
                    <td>{component.busWidth}-bit</td>
                </tr>
                <tr>
                    <th>Size:</th>
                    <td>For {component.format} Case</td>
                </tr>
                <tr>
                    <th>Conumption:</th>
                    <td>{component.consumption} Watt</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>{component.product.description}</td>
                </tr>
            </tbody>
        </table>
    )
}
