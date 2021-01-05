import {
    TextField,
    Button,
    makeStyles,
    createStyles,
    Theme,
    Box,
    Typography,
    Link
} from '@material-ui/core'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// import { useFetch } from '../hooks/Fetch/useFetch'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '26rem',
            margin: '8rem auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',

            '& > *': {
                margin: '0.5rem'
            },

            [theme.breakpoints.up('sm')]: {
                border: '1px solid',
                borderColor: theme.palette.divider,
                borderRadius: theme.shape.borderRadius,
                textAlign: 'start',
                padding: '1.5rem 2rem 1rem'
            }
        },
        heading: {
            marginBottom: '1rem'
        },
        signUp: {
            textAlign: 'center',
            marginTop: '1rem',
            '& a': {
                fontWeight: 600
            }
        }
    })
)

export const SignIn: React.FC<Props> = props => {
    const styles = useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // const {
    //     fetchData,
    //     state: { data, error, loading }
    // } = useFetch()

    const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (!username || !password) {
            return alert('please enter all the fields')
        }
    }

    return (
        <Box className={styles.root} component='form' onSubmit={onSubmit}>
            <Typography variant='h4' className={styles.heading}>
                Sign In.
            </Typography>
            <TextField
                label='Username'
                size='small'
                variant='outlined'
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <TextField
                label='Password'
                type='password'
                size='small'
                variant='outlined'
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <Button variant='contained' type='submit' color='primary'>
                Sign In
            </Button>
            <Typography variant='caption' color='textSecondary' className={styles.signUp}>
                Dont have an acconut?{' '}
                <Link component={RouterLink} to='/sign-up' underline='none'>
                    Sign up.
                </Link>
            </Typography>
        </Box>
    )
}
