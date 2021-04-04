import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { CASE_API_URL } from '../../../../../constants'
import { ChangeHandler } from '../../../../../types/Handlers'
import { Filter } from '../../Filter'

interface Props {
    type: string
    filters: any
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

interface CaseFilters {
    formats: string[]
}

export const CaseFilter: FunctionComponent<Props> = props => {
    if (props.type !== 'case') {
        return null
    }

    return (
        <Filter
            filters={props.filters}
            onChange={props.onChange}
            filter='format'
            name='Format'
            url={`${CASE_API_URL}/formats`}
        >
            {(data: CaseFilters, changeHandler: ChangeHandler<HTMLInputElement>) =>
                data?.formats.map((format: string) => (
                    <FormControlLabel
                        key={format}
                        control={
                            <Checkbox
                                checked={Boolean(props.filters?.format?.includes(format))}
                                onChange={changeHandler}
                                value={format}
                                name={format}
                                color='primary'
                            />
                        }
                        label={format}
                    />
                ))
            }
        </Filter>
    )
}
