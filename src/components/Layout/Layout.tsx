import { Container, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { Header } from './Header'

interface Props {
    children: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export const Layout: React.FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Header />
            <Container component='main' maxWidth='lg'>
                {props.children}
            </Container>
            <footer></footer>
        </>
    )
}
