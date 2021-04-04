import { Button, Card, CardContent, IconButton, Slider, Typography } from '@material-ui/core'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { MinMaxPrice, useGetMinMaxPrice } from '../../../../hooks/Filters/useGetMinMaxPrice'
import { useWindowSize } from '../../../../hooks/useWindowSize'
import styles from './PriceFilter.module.scss'

interface Props {
    type: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

export const PriceFilter: FunctionComponent<Props> = props => {
    const { onChange } = props

    const { width } = useWindowSize()

    const [isOpen, setIsOpen] = useState<boolean>(() => (width > 800 ? true : false))

    const toggleHandler = useCallback(() => {
        setIsOpen((currentIsOpen: boolean) => !currentIsOpen)
    }, [])

    const minMaxPrice: MinMaxPrice | null = useGetMinMaxPrice(props.type)

    const [value, setValue] = useState<number[]>([minMaxPrice?.min ?? 0, minMaxPrice?.max ?? 0])

    const changeHandler = useCallback((event: React.ChangeEvent<{}>, value: number | number[]) => {
        if (typeof value === 'number') {
            return
        }

        setValue(value)
    }, [])

    const submitHandler = useCallback(() => {
        onChange(filters => {
            return {
                ...filters,
                minPrice: value[0],
                maxPrice: value[1]
            }
        })
    }, [value, onChange])

    useEffect(() => {
        if (!minMaxPrice) {
            return
        }

        setValue([minMaxPrice.min, minMaxPrice.max])
    }, [minMaxPrice])

    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <Typography variant='subtitle1' color='textPrimary'>
                    Price
                    <IconButton onClick={toggleHandler}>
                        <IoIosArrowDown
                            style={{
                                transform: isOpen ? 'rotate(180deg)' : ''
                            }}
                        />
                    </IconButton>
                </Typography>
            </CardContent>

            <div className={styles.Content}>
                {isOpen && minMaxPrice && (
                    <>
                        <Slider
                            className={styles.Slider}
                            value={value}
                            onChange={changeHandler}
                            min={minMaxPrice.min}
                            max={minMaxPrice.max}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                        />
                        <Button
                            size='small'
                            className={styles.Button}
                            variant='contained'
                            color='primary'
                            fullWidth
                            onClick={submitHandler}
                        >
                            Filter
                        </Button>
                    </>
                )}
            </div>
        </Card>
    )
}
