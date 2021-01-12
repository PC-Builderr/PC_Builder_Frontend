import React from 'react'
import { CPU } from '../../../../types/components/CPU'
import styles from '../index.module.scss'

interface Props {
    cpu: CPU
}

export const CPUProductTable: React.FC<Props> = ({ cpu }) => {
    return (
        <table className={styles.root}>
            <tbody>
                <tr>
                    <th>Series:</th>
                    <td>{cpu.series}</td>
                </tr>
                <tr>
                    <th>Generation:</th>
                    <td>{cpu.generation}</td>
                </tr>
                <tr>
                    <th>Model:</th>
                    <td>{cpu.model}</td>
                </tr>
                <tr>
                    <th>Brand:</th>
                    <td>{cpu.product.brand.name}</td>
                </tr>
                <tr>
                    <th>Socket:</th>
                    <td>{cpu.socket}</td>
                </tr>
                <tr>
                    <th>Core:</th>
                    <td>{cpu.core}</td>
                </tr>
                <tr>
                    <th>Thread:</th>
                    <td>{cpu.thread}</td>
                </tr>
                <tr>
                    <th>Speed:</th>
                    <td>{cpu.speed}GHz</td>
                </tr>
                <tr>
                    <th>Turbo speed:</th>
                    <td>{cpu.turboSpeed}GHz</td>
                </tr>
                <tr>
                    <th>Cache:</th>
                    <td>{cpu.cache}</td>
                </tr>
                <tr>
                    <th>Integrated graphics:</th>
                    <td>{cpu.integratedGraphics || '-'}</td>
                </tr>
                <tr>
                    <th>RAM type:</th>
                    <td>{cpu.ramType}</td>
                </tr>
                <tr>
                    <th>RAM capacity:</th>
                    <td>{cpu.ramCapacity}GB</td>
                </tr>
                <tr>
                    <th>Max RAM speed:</th>
                    <td>{cpu.maxRamSpeed}MHz</td>
                </tr>
                <tr>
                    <th>Conumption:</th>
                    <td>{cpu.consumption}</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{cpu.product.description} W</td>
                </tr>
            </tbody>
        </table>
    )
}
