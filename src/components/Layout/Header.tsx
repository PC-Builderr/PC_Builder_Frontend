import { AppBar, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            maxWidth: theme.breakpoints.values.lg,
            width: '100%',
            margin: 'auto'
        }
    })
)

export const Header: React.FC<Props> = props => {
    const styles = useStyles()

    return (
        <AppBar>
            <Toolbar className={styles.toolbar}>
                <Typography variant='h5'>PC Builder</Typography>
            </Toolbar>
        </AppBar>
    )
}
