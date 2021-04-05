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
import { FcCancel } from 'react-icons/fc'
import { CPU } from '../../../../types/components/CPU'
import styles from '../index.module.scss'

interface Props {
    component: CPU
}

export const CPUProductTable: FunctionComponent<Props> = ({ component }) => {
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
                            <Typography variant='subtitle2'>Generation:</Typography>
                        </TableCell>
                        <TableCell>{component.generation}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Model:</Typography>
                        </TableCell>
                        <TableCell>{component.model}</TableCell>
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
                            <Typography variant='subtitle2'>Core:</Typography>
                        </TableCell>
                        <TableCell>{component.core}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Thread:</Typography>
                        </TableCell>
                        <TableCell>{component.thread}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Speed:</Typography>
                        </TableCell>
                        <TableCell>{component.speed} GHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Turbo speed:</Typography>
                        </TableCell>
                        <TableCell>{component.turboSpeed} GHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Cache:</Typography>
                        </TableCell>
                        <TableCell>{component.cache}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Integrated graphics:</Typography>
                        </TableCell>
                        <TableCell>{component.integratedGraphics || <FcCancel />}</TableCell>
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
                            <Typography variant='subtitle2'>Max RAM speed:</Typography>
                        </TableCell>
                        <TableCell>{component.maxRamSpeed} MHz</TableCell>
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
