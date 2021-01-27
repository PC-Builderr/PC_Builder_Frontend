import React, { FunctionComponent } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { ClickHandler } from '../../../../../types/Handlers'
import styles from '../index.module.scss'

interface Props {
    onClick?: ClickHandler<HTMLButtonElement>
}

export const Forward: FunctionComponent<Props> = props => {
    return (
        <button className={styles.root} onClick={props.onClick}>
            <MdKeyboardArrowRight />
        </button>
    )
}
