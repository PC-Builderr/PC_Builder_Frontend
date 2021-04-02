import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { CPU_API_URL } from '../../../../../constants'
import { ChangeHandler } from '../../../../../types/Handlers'
import { Filter } from '../../Filter'
import styles from '../../ProductFilters.module.scss'

interface Props {
    type: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

interface Generations {
    generations: string[]
}

export const CPUFilter: FunctionComponent<Props> = props => {
    if (props.type !== 'cpu') {
        return null
    }

    return (
        <Filter
            filters={props.filters}
            onChange={props.onChange}
            filter='generation'
            name='Generation'
            url={`${CPU_API_URL}/generation`}
        >
            {(data: Generations, changeHandler: ChangeHandler<HTMLInputElement>) =>
                data?.generations.map((generation: string) => (
                    <FormControlLabel
                        className={styles.Checkbox}
                        key={generation}
                        control={
                            <Checkbox
                                checked={Boolean(props.filters?.generation?.includes(generation))}
                                onChange={changeHandler}
                                value={generation}
                                name={generation}
                                color='primary'
                            />
                        }
                        label={generation}
                    />
                ))
            }
        </Filter>
    )
}
