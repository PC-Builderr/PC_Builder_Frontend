import { Card, CardContent, Typography, useMediaQuery } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Header.module.scss'

interface Props {
    children: React.ReactNode
    count?: number
    className?: string
}

export const Header: FunctionComponent<Props> = props => {
    const medium = useMediaQuery('(max-width:960px)')

    return (
        <Card className={[styles.root, props.className].join(' ')} variant='outlined'>
            <CardContent>
                <Typography variant={medium ? 'h5' : 'h4'}>{props.children}</Typography>
                {props.count ? (
                    <Typography color='textSecondary' variant={medium ? 'h6' : 'h5'}>
                        ({props.count})
                    </Typography>
                ) : null}
            </CardContent>
        </Card>
    )
}
