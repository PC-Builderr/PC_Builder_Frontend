import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import { Motherboard } from '../../../../types/components/Motherboard'
import styles from '../index.module.scss'

interface Props {
    component: Motherboard
}

export const MotherboardProductTable: FunctionComponent<Props> = ({ component }) => {
    return (
        <TableContainer className={styles.root} component={Card} variant='outlined'>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Series:</Typography>
                        </TableCell>
                        <TableCell>{component.series}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Brand:</Typography>
                        </TableCell>
                        <TableCell>{component.product.brand.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Socket:</Typography>
                        </TableCell>
                        <TableCell>{component.socket}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Chipset:</Typography>
                        </TableCell>
                        <TableCell>{component.chipset}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>RAM type:</Typography>
                        </TableCell>
                        <TableCell>{component.ramType}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>RAM capacity:</Typography>
                        </TableCell>
                        <TableCell>{component.ramCapacity} GB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>RAM slots:</Typography>
                        </TableCell>
                        <TableCell>{component.ramSlots} GB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Max RAM speed:</Typography>
                        </TableCell>
                        <TableCell>{component.maxRamSpeed} MHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>М.2 NVMe slots:</Typography>
                        </TableCell>
                        <TableCell>{component.m2Ports || <FcCancel />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>SATA ports:</Typography>
                        </TableCell>
                        <TableCell>{component.sataPorts}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>PCI slots:</Typography>
                        </TableCell>
                        <TableCell>{component.pciSlots}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Format:</Typography>
                        </TableCell>
                        <TableCell>{component.format}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Nvidia SLI:</Typography>
                        </TableCell>
                        <TableCell>
                            {component.nvidiaSli ? <FcCheckmark /> : <FcCancel />}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>AMD Crossfire:</Typography>
                        </TableCell>
                        <TableCell>
                            {component.amdCrossfire ? <FcCheckmark /> : <FcCancel />}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Conumption:</Typography>
                        </TableCell>
                        <TableCell>{component.consumption} Watt</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Description:</Typography>
                        </TableCell>
                        <TableCell>{component.product.description}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
