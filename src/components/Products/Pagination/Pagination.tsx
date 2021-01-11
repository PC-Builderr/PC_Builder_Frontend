import React from 'react'
import styles from './Pagination.module.scss'
import { Link, useLocation } from 'react-router-dom'

interface Props {
    count: number
}

export const Pagination: React.FC<Props> = props => {
    const { pathname, search } = useLocation()
    const urlSearchParams = new URLSearchParams(search)
    const activePage: number = Number(urlSearchParams.get('page')) || 1

    return (
        <div className={styles.root}>
            {new Array(Math.round(props.count)).fill(1).map((page: number, index: number) => {
                urlSearchParams.set('page', String(index + 1))
                return (
                    <Link
                        className={activePage === index + 1 ? styles.active : ''}
                        key={index}
                        to={`${pathname}?${urlSearchParams.toString()}`}
                    >
                        {index + 1}
                    </Link>
                )
            })}
        </div>
    )
}
