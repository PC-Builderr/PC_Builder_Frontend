import React from 'react'
import { Case } from '../../../../types/components/Case'
import styles from '../index.module.scss'

interface Props {
    component: Case
}

export const CaseProductTable: React.FC<Props> = ({ component }) => {
    return (
        <table className={styles.root}>
            <tbody>
                <tr>
                    <th>Model:</th>
                    <td>{component.product.name}</td>
                </tr>
                <tr>
                    <th>Format:</th>
                    <td>{component.format}</td>
                </tr>
                <tr>
                    <th>Brand:</th>
                    <td>{component.product.brand.name}</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>{component.product.description}</td>
                </tr>
            </tbody>
        </table>
    )
}
