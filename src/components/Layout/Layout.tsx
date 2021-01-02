import { Container, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { Header } from './Header'

interface Props {
    children: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            marginTop: '4rem'
        }
    })
)

export const Layout: React.FC<Props> = props => {
    const styles = useStyles()

    return (
        <>
            <Header />
            <Container className={styles.main} component='main' maxWidth='lg'>
                {props.children}
            </Container>
            <footer></footer>
        </>
    )
}
