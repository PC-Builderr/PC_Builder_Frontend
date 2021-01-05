import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import styles from './SearchInput.module.scss'

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const SearchInput: React.FC<Props> = props => {
    return (
        <div className={styles.root}>
            <IoSearchSharp />
            <input type='text' placeholder='Search...' {...props} />
        </div>
    )
}
