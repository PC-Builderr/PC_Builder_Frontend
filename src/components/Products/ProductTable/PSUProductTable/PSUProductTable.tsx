import React, { FunctionComponent } from 'react'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import { PSU } from '../../../../types/components/PSU'
import styles from '../index.module.scss'

interface Props {
    component: PSU
}

export const PSUProductTable: FunctionComponent<Props> = ({ component }) => {
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
                    <th>Certificate:</th>
                    <td>{component.certificate}</td>
                </tr>
                <tr>
                    <th>Power:</th>
                    <td>{component.power} Watt</td>
                </tr>
                <tr>
                    <th>Modular:</th>
                    <td>{component.modular ? <FcCheckmark /> : <FcCancel />}</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>{component.product.description}</td>
                </tr>
            </tbody>
        </table>
    )
}
