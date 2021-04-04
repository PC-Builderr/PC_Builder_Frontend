import React, { FunctionComponent } from 'react'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import styles from './HeroSection.module.scss'

interface Props {}

export const HeroSection: FunctionComponent<Props> = props => {
    return (
        <section className={styles.root}>
            <h1>
                Building computers
                <br /> has never been easier!
            </h1>
            <PrimaryButton>Go To Builder</PrimaryButton>
            <button>Check our other products</button>
        </section>
    )
}
