import React, { FunctionComponent } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { ITEMS_PER_PAGE } from '../../../constants'
import { WithMediaQuery } from '../../../hoc/WithMediaQuery'
import styles from './Pagination.module.scss'

interface Props {
    count: number
}

export const Pagination: FunctionComponent<Props> = props => {
    const { pathname, search } = useLocation<Location>()

    const urlSearchParams: URLSearchParams = new URLSearchParams(search)
    const activePage: number = Number(urlSearchParams.get('page')) || 1

    const allPages = new Array(Math.round(props.count / ITEMS_PER_PAGE) || 1)
        .fill(1)
        .map((_, index: number): number => index + 1)

    let start: number = 0
    let end: number = 5

    if (activePage > 3) {
        start = activePage - 3
        end = start + 5
    }

    if (end > allPages.length) {
        end = allPages.length

        if (end >= 5) {
            start = end - 5
        }
    }

    const pagesToDisplay: number[] = allPages.slice(start, end)

    let prevPage: JSX.Element | null = null

    if (activePage > 1) {
        urlSearchParams.set('page', String(activePage - 1))
        prevPage = (
            <Link to={`${pathname}?${urlSearchParams.toString()}`}>
                <MdKeyboardArrowLeft />
            </Link>
        )
    }

    let nextPage: JSX.Element | null = null

    if (activePage < allPages.length) {
        urlSearchParams.set('page', String(activePage + 1))
        nextPage = (
            <Link to={`${pathname}?${urlSearchParams.toString()}`}>
                <MdKeyboardArrowRight />
            </Link>
        )
    }

    return (
        <div className={styles.root}>
            {prevPage}
            <WithMediaQuery maxWidth={470}>
                <>
                    {start ? <p>. . .</p> : null}
                    {pagesToDisplay.map((page: number) => {
                        urlSearchParams.set('page', String(page))
                        return (
                            <Link
                                className={activePage === page ? styles.active : ''}
                                key={page}
                                to={`${pathname}?${urlSearchParams.toString()}`}
                            >
                                {page}
                            </Link>
                        )
                    })}
                    {end !== allPages.length ? <p>. . .</p> : null}
                </>
            </WithMediaQuery>
            <WithMediaQuery minWidth={470}>
                <span>
                    {activePage} of {allPages.length} pages.
                </span>
            </WithMediaQuery>
            {nextPage}
        </div>
    )
}
