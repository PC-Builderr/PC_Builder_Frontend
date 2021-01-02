import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

interface Props {}

export const Header: React.FC<Props> = props => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant='h4'>Hello</Typography>
            </Toolbar>
        </AppBar>
    )
}
