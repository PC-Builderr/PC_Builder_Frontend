import React, { FunctionComponent } from 'react'
import { Case } from '../../../../types/components/Case'
import styles from '../index.module.scss'

interface Props {
    component: Case
}

export const CaseProductTable: FunctionComponent<Props> = ({ component }) => {
    return (
        <table className={styles.root}>
            <tbody>
                <tr>
                    <th>Series:</th>
                    <td>{component.series}</td>
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
