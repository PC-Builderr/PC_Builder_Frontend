import React, { useCallback, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
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

export const Filter: React.FC<Props> = props => {
    const { onChange, filter, url }: Props = props

    const [data, setData] = useState(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const toggleHandler = useCallback(() => {
        setIsOpen((currentIsOpen: boolean) => !currentIsOpen)
    }, [])

    const fetchData = useCallback(async () => {
        setData(null)

        const response = await fetch(url)
        if (!response.ok) return

        const resData = await response.json()

        setData(resData)
    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const changeHandler = (event: Change<HTMLInputElement>) => {
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
    }

    return (
        <li className={styles.root}>
            <div>
                <p>{props.name}</p>
                <button onClick={toggleHandler}>
                    <IoIosArrowDown
                        style={{
                            transform: isOpen ? 'rotate(180deg)' : ''
                        }}
                    />
                </button>
            </div>
            {isOpen && data && <ul>{props.children(data, changeHandler)}</ul>}
        </li>
    )
}
