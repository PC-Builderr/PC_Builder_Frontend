import { Card, CardContent, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Header.module.scss'

interface Props {
    children: React.ReactNode
    count?: number
}

export const Header: FunctionComponent<Props> = props => {
    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <Typography variant='h4'>{props.children}</Typography>
                {props.count && (
                    <Typography color='textSecondary' variant='h5'>
                        ({props.count})
                    </Typography>
                )}
            </CardContent>
        </Card>
    )
}
