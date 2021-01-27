import React, { FunctionComponent } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { ClickHandler } from '../../../../../types/Handlers'
import styles from '../index.module.scss'

interface Props {
    onClick?: ClickHandler<HTMLButtonElement>
}

export const Backward: FunctionComponent<Props> = props => {
    return (
        <button className={styles.root} onClick={props.onClick}>
            <MdKeyboardArrowLeft />
        </button>
    )
}
