import { Card, CardContent, IconButton, Typography } from '@material-ui/core'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useIsMounted } from '../../../../hooks/useIsMounted'
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { Change } from '../../../../types/Events'
import { ChangeHandler } from '../../../../types/Handlers'
import styles from './Filter.module.scss'

interface Props {
    name: string
    url: string
    filter: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
    children: (
        data: any,
        changeHandler: ChangeHandler<HTMLInputElement>
    ) => React.ReactNode[] | React.ReactNode
}

export const Filter: FunctionComponent<Props> = props => {
    const { onChange, filter, url }: Props = props

    const { width } = useWindowSize()

    const [data, setData] = useState(null)
    const [isOpen, setIsOpen] = useState<boolean>(() => (width > 800 ? true : false))

    const isMounted: React.MutableRefObject<boolean> = useIsMounted()

    const toggleHandler = useCallback(() => {
        setIsOpen((currentIsOpen: boolean) => !currentIsOpen)
    }, [])

    const fetchData = useCallback(async () => {
        const response = await fetch(url)
        if (!response.ok) {
            setData(null)
            return
        }

        if (!isMounted.current) return

        const resData = await response.json()

        setData(resData)
    }, [url, isMounted])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const changeHandler = useCallback(
        (event: Change<HTMLInputElement>) => {
            const value: any = Number(event.target.value) || event.target.value

            onChange((currentFilters: any) => {
                if (currentFilters[filter]?.includes(value)) {
                    const newFilters: any = {
                        ...currentFilters,
                        [filter]: currentFilters[filter].filter((el: any) => el !== value)
                    }
                    if (!newFilters[filter].length) {
                        delete newFilters[filter]
                    }
                    return newFilters
                }
                if (!currentFilters[filter]) {
                    return { ...currentFilters, [filter]: [value] }
                }
                return { ...currentFilters, [filter]: [...currentFilters[filter], value] }
            })
        },
        [filter, onChange]
    )

    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <Typography variant='subtitle1' color='textPrimary'>
                    {props.name}
                    <IconButton onClick={toggleHandler}>
                        <IoIosArrowDown
                            style={{
                                transform: isOpen ? 'rotate(180deg)' : ''
                            }}
                        />
                    </IconButton>
                </Typography>
            </CardContent>
            <ul>{isOpen && data && props.children(data, changeHandler)}</ul>
        </Card>
    )
}
