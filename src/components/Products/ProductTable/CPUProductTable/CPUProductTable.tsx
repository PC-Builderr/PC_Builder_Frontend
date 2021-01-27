import React, { FunctionComponent } from 'react'
import { FcCancel } from 'react-icons/fc'
import { CPU } from '../../../../types/components/CPU'
import styles from '../index.module.scss'

interface Props {
    component: CPU
}

export const CPUProductTable: FunctionComponent<Props> = ({ component }) => {
    return (
        <table className={styles.root}>
            <tbody>
                <tr>
                    <th>Series:</th>
                    <td>{component.series}</td>
                </tr>
                <tr>
                    <th>Generation:</th>
                    <td>{component.generation}</td>
                </tr>
                <tr>
                    <th>Model:</th>
                    <td>{component.model}</td>
                </tr>
                <tr>
                    <th>Brand:</th>
                    <td>{component.product.brand.name}</td>
                </tr>
                <tr>
                    <th>Socket:</th>
                    <td>{component.socket}</td>
                </tr>
                <tr>
                    <th>Core:</th>
                    <td>{component.core}</td>
                </tr>
                <tr>
                    <th>Thread:</th>
                    <td>{component.thread}</td>
                </tr>
                <tr>
                    <th>Speed:</th>
                    <td>{component.speed} GHz</td>
                </tr>
                <tr>
                    <th>Turbo speed:</th>
                    <td>{component.turboSpeed} GHz</td>
                </tr>
                <tr>
                    <th>Cache:</th>
                    <td>{component.cache}</td>
                </tr>
                <tr>
                    <th>Integrated graphics:</th>
                    <td>{component.integratedGraphics || <FcCancel />}</td>
                </tr>
                <tr>
                    <th>RAM type:</th>
                    <td>{component.ramType}</td>
                </tr>
                <tr>
                    <th>RAM capacity:</th>
                    <td>{component.ramCapacity} GB</td>
                </tr>
                <tr>
                    <th>Max RAM speed:</th>
                    <td>{component.maxRamSpeed} MHz</td>
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
