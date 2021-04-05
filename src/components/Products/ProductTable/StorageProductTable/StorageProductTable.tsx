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
import { Storage } from '../../../../types/components/Storage'
import styles from '../index.module.scss'

interface Props {
    component: Storage
}

export const StorageProductTable: FunctionComponent<Props> = ({ component }) => {
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
                            <Typography variant='subtitle2'>Type:</Typography>
                        </TableCell>
                        <TableCell>{component.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Capacity:</Typography>
                        </TableCell>
                        <TableCell>{component.capacity} GB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Read speed:</Typography>
                        </TableCell>
                        <TableCell>{component.readSpeed} MHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Write speed:</Typography>
                        </TableCell>
                        <TableCell>{component.writeSpeed} MHz</TableCell>
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
