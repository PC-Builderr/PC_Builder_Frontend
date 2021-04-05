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
import { GPU } from '../../../../types/components/GPU'
import styles from '../index.module.scss'

interface Props {
    component: GPU
}

export const GPUProductTable: FunctionComponent<Props> = ({ component }) => {
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
                            <Typography variant='subtitle2'>Speed:</Typography>
                        </TableCell>
                        <TableCell>{component.speed} MHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Memory:</Typography>
                        </TableCell>
                        <TableCell>{component.memory} GB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Memory type:</Typography>
                        </TableCell>
                        <TableCell>{component.memoryType}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Bus width:</Typography>
                        </TableCell>
                        <TableCell>{component.busWidth}-bit</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Size:</Typography>
                        </TableCell>
                        <TableCell>For {component.format} Case</TableCell>
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
