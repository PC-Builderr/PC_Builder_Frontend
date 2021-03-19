import React, { FunctionComponent, useCallback, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useGetMinMaxPrice, MinMaxPrice } from '../../../../hooks/Filters/useGetMinMaxPrice'
import { useIsMounted } from '../../../../hooks/useIsMounted'
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { Checkbox } from '../../../UI/Checkbox'
import styles from '../Filter/Filter.module.scss'

interface Props {
    type: string
}

export const PriceFilter: FunctionComponent<Props> = props => {
    const { width } = useWindowSize()

    const [isOpen, setIsOpen] = useState<boolean>(() => (width > 800 ? true : false))

    const toggleHandler = useCallback(() => {
        setIsOpen((currentIsOpen: boolean) => !currentIsOpen)
    }, [])

    const minMaxPrice: MinMaxPrice | null = useGetMinMaxPrice(props.type)

    const minMaxArr: MinMaxPrice[] = generateArrayFromMinMax(minMaxPrice)

    return (
        <li className={styles.root}>
            <div>
                <p>Price</p>
                <button onClick={toggleHandler}>
                    <IoIosArrowDown
                        style={{
                            transform: isOpen ? 'rotate(180deg)' : ''
                        }}
                    />
                </button>
            </div>
            {isOpen && minMaxArr && (
                <ul>
                    {minMaxArr.map((minMaxPrice: MinMaxPrice) => {
                        return (
                            <Checkbox
                                checked={false}
                                key={minMaxPrice.min}
                                id={String(minMaxPrice.min)}
                                name={`${minMaxPrice.min}лв. <--> ${minMaxPrice.max}лв.`}
                                onChange={() => {}}
                                value={minMaxPrice.min}
                            />
                        )
                    })}
                </ul>
            )}
        </li>
    )
}

const generateArrayFromMinMax = (minMaxPrice: MinMaxPrice | null) => {
    if (!minMaxPrice) {
        return []
    }

    const dif: number = minMaxPrice.max - minMaxPrice.min

    return new Array(Math.round(dif / 250)).fill(1).map((_, index: number) => {
        return Math.round(dif / 250) === index + 1
            ? { min: minMaxPrice.min + 250 * index, max: minMaxPrice.max }
            : { min: minMaxPrice.min + 250 * index, max: minMaxPrice.min + 250 * index + 250 }
    })
}
