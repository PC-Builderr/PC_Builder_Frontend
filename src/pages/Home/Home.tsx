import React, { FunctionComponent } from 'react'
import { HeroSection } from '../../components/UI/HeroSection/HeroSection'
import styles from './Home.module.scss'

export const Home: FunctionComponent = () => {
    return (
        <div className={styles.root}>
            <HeroSection />
        </div>
    )
}
