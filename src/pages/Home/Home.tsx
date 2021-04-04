import React, { FunctionComponent } from 'react'
import { SimilarProductsSlider } from '../../components/Products/SimilarProductsSlider'
import { Header } from '../../components/UI/Header'
import { HeroSection } from '../../components/UI/HeroSection/HeroSection'
import { ComponentNames } from '../../constants'
import styles from './Home.module.scss'

const cmpArray: string[] = Array.from(ComponentNames.keys())

export const Home: FunctionComponent = () => {
    return (
        <div className={styles.root}>
            <HeroSection />
            {cmpArray.map((value: string) => (
                <div key={value}>
                    <Header>{ComponentNames.get(value)}</Header>
                    <SimilarProductsSlider search={value} />
                </div>
            ))}
        </div>
    )
}
