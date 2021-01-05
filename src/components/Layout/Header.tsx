import {
    AppBar,
    createStyles,
    Link,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            maxWidth: theme.breakpoints.values.lg,
            width: '100%',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        link: {
            color: '#ffffff',
            display: 'block'
        }
    })
)

export const Header: React.FC<Props> = props => {
    const styles = useStyles()

    return (
        <AppBar>
            <Toolbar className={styles.toolbar}>
                <Link
                    className={styles.link}
                    variant='h5'
                    underline='none'
                    to='/'
                    component={RouterLink}
                >
                    PC Builder
                </Link>
                <Link
                    className={styles.link}
                    variant='subtitle2'
                    underline='none'
                    to='/'
                    component={RouterLink}
                >
                    Build your PC
                </Link>
            </Toolbar>
        </AppBar>
    )
}
