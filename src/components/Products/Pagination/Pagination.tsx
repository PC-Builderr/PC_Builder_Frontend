import { Pagination as Pagin } from '@material-ui/lab'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ITEMS_PER_PAGE } from '../../../constants'
import { useWindowSize } from '../../../hooks/useWindowSize'
import styles from './Pagination.module.scss'

interface Props {
    count: number
}

export const Pagination: FunctionComponent<Props> = props => {
    const { pathname, search } = useLocation<Location>()
    const { width } = useWindowSize()
    const history = useHistory()
    const urlSearchParams = useMemo<URLSearchParams>(() => new URLSearchParams(search), [search])
    const activePage: number = Number(urlSearchParams.get('page')) || 1
    const pagesCount: number = Math.round(props.count / ITEMS_PER_PAGE) || 1

    const pageChangeHandler = useCallback(
        (event: React.ChangeEvent<unknown>, page: number) => {
            urlSearchParams.set('page', String(page))

            history.push(`${pathname}?${urlSearchParams.toString()}`)
        },
        [urlSearchParams, history, pathname]
    )

    return (
        <Pagin
            className={styles.root}
            color='primary'
            count={pagesCount}
            size={width < 470 ? undefined : 'large'}
            siblingCount={width < 470 ? 0 : undefined}
            page={activePage}
            onChange={pageChangeHandler}
        />
    )
}
