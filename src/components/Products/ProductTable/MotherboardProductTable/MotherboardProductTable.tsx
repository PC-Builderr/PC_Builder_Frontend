import React from 'react'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import { Motherboard } from '../../../../types/components/Motherboard'
import styles from '../index.module.scss'

interface Props {
    component: Motherboard
}

export const MotherboardProductTable: React.FC<Props> = ({ component }) => {
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
                    <th>Socket:</th>
                    <td>{component.socket}</td>
                </tr>
                <tr>
                    <th>Chipset:</th>
                    <td>{component.chipset}</td>
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
                    <th>RAM slots:</th>
                    <td>{component.ramSlots} GB</td>
                </tr>
                <tr>
                    <th>Max RAM speed:</th>
                    <td>{component.maxRamSpeed} MHz</td>
                </tr>
                <tr>
                    <th>М.2 NVMe slots:</th>
                    <td>{component.m2Ports || <FcCancel />}</td>
                </tr>
                <tr>
                    <th>SATA ports:</th>
                    <td>{component.sataPorts}</td>
                </tr>
                <tr>
                    <th>PCI slots:</th>
                    <td>{component.pciSlots}</td>
                </tr>
                <tr>
                    <th>Format:</th>
                    <td>{component.format}</td>
                </tr>
                <tr>
                    <th>Nvidia SLI:</th>
                    <td>{component.nvidiaSli ? <FcCheckmark /> : <FcCancel />}</td>
                </tr>
                <tr>
                    <th>AMD Crossfire:</th>
                    <td>{component.amdCrossfire ? <FcCheckmark /> : <FcCancel />}</td>
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
