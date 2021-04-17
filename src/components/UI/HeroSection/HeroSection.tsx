import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router'
import { ComponentNames } from '../../../constants'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import styles from './HeroSection.module.scss'

interface Props {}

const cmpArray: string[] = Array.from(ComponentNames.keys())

export const HeroSection: FunctionComponent<Props> = props => {
    const tablet = useMediaQuery('(max-width:1050px)')
    const mobile = useMediaQuery('(max-width:465px)')

    const history = useHistory()

    const variant = useMemo<Variant>(() => {
        if (mobile) {
            return 'h4'
        }

        if (tablet) {
            return 'h3'
        }

        return 'h2'
    }, [mobile, tablet])

    const goToProductsHandler = useCallback(() => {
        history.push(`/products/${cmpArray[Math.floor(Math.random() * cmpArray.length)]}`)
    }, [history])

    const goToBuilderHandler = useCallback(() => {
        history.push('/pc-builder')
    }, [history])

    return (
        <section className={styles.root}>
            <div>
                <Typography variant={variant}>
                    Building computers
                    {tablet || <br />} has never been easier!
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                    Together We Can Create a High Performance Custom Designed PC.
                </Typography>
                <Grid direction='row' alignItems='center' container>
                    <PrimaryButton onClick={goToBuilderHandler}>Build your pc</PrimaryButton>
                    <Button
                        onClick={goToProductsHandler}
                        color='primary'
                        variant='outlined'
                        size='large'
                    >
                        Check our other products
                    </Button>
                </Grid>
            </div>
            <WithMediaQuery maxWidth={1050}>
                <div className={styles.image}>
                    <img
                        src='https://desktop.bg/system/images/268846/normal/custom_pc_assembly.png'
                        alt='Computer'
                    />
                </div>
            </WithMediaQuery>
        </section>
    )
}
