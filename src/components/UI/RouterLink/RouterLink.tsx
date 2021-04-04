import { Button, IconButton } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './RouterLink.module.scss'

interface Props {
    to: string
}

export const RouterLink: FunctionComponent<Props> = props => {
    return (
        <Button className={styles.root} component={Link} to={props.to}>
            {props.children}
        </Button>
    )
}

export const IconRouterLink: FunctionComponent<Props> = props => {
    return (
        <IconButton className={styles.root} component={Link} to={props.to}>
            {props.children}
        </IconButton>
    )
}
