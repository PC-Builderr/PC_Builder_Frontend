import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import classes from './SearchInput.module.scss'

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const SearchInput: React.FC<Props> = props => {
    return (
        <div className={classes.Search}>
            <IoSearchSharp className={classes.Icon} />
            <input type='text' placeholder='Search...' {...props} />
        </div>
    )
}
