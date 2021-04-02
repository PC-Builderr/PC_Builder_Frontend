import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { STORAGE_API_URL } from '../../../../../constants'
import { ChangeHandler } from '../../../../../types/Handlers'
import { Filter } from '../../Filter'
import styles from '../../ProductFilters.module.scss'

interface Props {
    type: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

interface Types {
    types: string[]
}

interface Capacities {
    capacity: number[]
}

export const StorageFilter: FunctionComponent<Props> = props => {
    if (props.type !== 'storage') {
        return null
    }

    return (
        <>
            <Filter
                filters={props.filters}
                onChange={props.onChange}
                filter='type'
                name='Type'
                url={`${STORAGE_API_URL}/types`}
            >
                {(data: Types, changeHandler: ChangeHandler<HTMLInputElement>) =>
                    data?.types.map((t: string) => (
                        <FormControlLabel
                            className={styles.Checkbox}
                            key={t}
                            control={
                                <Checkbox
                                    checked={Boolean(props.filters?.type?.includes(t))}
                                    onChange={changeHandler}
                                    value={t}
                                    name={t}
                                    color='primary'
                                />
                            }
                            label={t}
                        />
                    ))
                }
            </Filter>
            <Filter
                filters={props.filters}
                onChange={props.onChange}
                filter='capacity'
                name='Capacity'
                url={`${STORAGE_API_URL}/capacity`}
            >
                {(data: Capacities, changeHandler: ChangeHandler<HTMLInputElement>) =>
                    data?.capacity.map((capacity: number) => (
                        <FormControlLabel
                            className={styles.Checkbox}
                            key={capacity}
                            control={
                                <Checkbox
                                    checked={Boolean(props.filters?.capacity?.includes(capacity))}
                                    onChange={changeHandler}
                                    value={capacity}
                                    name={String(capacity)}
                                    color='primary'
                                />
                            }
                            label={capacity}
                        />
                    ))
                }
            </Filter>
        </>
    )
}
