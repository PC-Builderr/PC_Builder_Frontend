import { Card, CardContent, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './NotFound.module.scss'

export const NotFound: FunctionComponent = () => {
    return (
        <Card variant='outlined'>
            <CardContent className={styles.root}>
                <Typography>No Products Found</Typography>
            </CardContent>
        </Card>
    )
}
