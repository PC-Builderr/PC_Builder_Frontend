import React, { FunctionComponent } from 'react'
import { ShippingAddress } from '../../../types/order/ShippingAddress'
import styles from './ShippingAddressCard.module.scss'

interface Props {
    address: ShippingAddress
}

export const ShippingAddressCard: FunctionComponent<Props> = props => {
    return (
        <div className={styles.root}>
            <input
                type='radio'
                name='shipping-address'
                id={String(props.address.id)}
                value={props.address.id}
            />
            <div>
                <label htmlFor={String(props.address.id)}>{props.address.address}</label>
                <p>Phone: {props.address.phone}</p>
            </div>
        </div>
    )
}
