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
import { PSU } from '../../../../types/components/PSU'
import styles from '../index.module.scss'

interface Props {
    component: PSU
}

export const PSUProductTable: FunctionComponent<Props> = ({ component }) => {
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
                            <Typography variant='subtitle2'>Certificate:</Typography>
                        </TableCell>
                        <TableCell>{component.certificate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Power:</Typography>
                        </TableCell>
                        <TableCell>{component.power} Watt</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle2'>Modular:</Typography>
                        </TableCell>
                        <TableCell>{component.modular ? <FcCheckmark /> : <FcCancel />}</TableCell>
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
