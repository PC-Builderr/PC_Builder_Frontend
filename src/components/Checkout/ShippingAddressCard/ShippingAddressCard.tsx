import { Radio } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { ShippingAddress } from '../../../types/order/ShippingAddress'
import styles from './ShippingAddressCard.module.scss'

interface Props {
    address: ShippingAddress
    selected: number | null
    changeHandler: React.Dispatch<React.SetStateAction<number | null>>
}

export const ShippingAddressCard: FunctionComponent<Props> = props => {
    return (
        <div className={styles.root}>
            <Radio
                name='shipping-address'
                id={String(props.address.id)}
                value={props.address.id}
                checked={props.selected === props.address.id}
                color='primary'
                onChange={() => {
                    props.changeHandler(props.address.id)
                }}
            />
            <div>
                <label htmlFor={String(props.address.id)}>{props.address.address}</label>
                <p>Phone: {props.address.phone}</p>
            </div>
        </div>
    )
}
