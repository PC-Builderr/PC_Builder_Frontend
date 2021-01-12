import React from 'react'
import { Storage } from '../../../../types/components/Storage'
import styles from '../index.module.scss'

interface Props {
    component: Storage
}

export const StorageProductTable: React.FC<Props> = ({ component }) => {
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
                    <th>Type:</th>
                    <td>{component.type}</td>
                </tr>
                <tr>
                    <th>Capacity:</th>
                    <td>{component.capacity} GB</td>
                </tr>
                <tr>
                    <th>Read speed:</th>
                    <td>{component.readSpeed} MHz</td>
                </tr>
                <tr>
                    <th>Write speed:</th>
                    <td>{component.writeSpeed} MHz</td>
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
