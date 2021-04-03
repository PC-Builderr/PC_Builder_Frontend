import React, { FunctionComponent } from 'react'
import { Button } from '../Button/Button'
import styles from './HeroSection.module.scss'

interface Props {}

export const HeroSection: FunctionComponent<Props> = props => {
    return (
        <section className={styles.root}>
            <h1>
                Building computers
                <br /> has never been easier!
            </h1>
            <Button>Go To Builder</Button>
            <button>Check our other products</button>
        </section>
    )
}
