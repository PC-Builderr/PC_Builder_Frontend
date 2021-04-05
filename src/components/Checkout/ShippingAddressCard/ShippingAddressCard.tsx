import { FormControlLabel, ListItem, Radio, Typography } from '@material-ui/core'
import React, { FunctionComponent, useCallback } from 'react'
import { ShippingAddress } from '../../../types/order/ShippingAddress'
import styles from './ShippingAddressCard.module.scss'

interface Props {
    address: ShippingAddress
    selected: number | null
    changeHandler: React.Dispatch<React.SetStateAction<number | null>>
}

export const ShippingAddressCard: FunctionComponent<Props> = props => {
    const changeHandler = useCallback(() => {
        props.changeHandler(props.address.id)
    }, [props])

    return (
        <ListItem className={styles.root} onClick={changeHandler} button>
            <FormControlLabel
                value='disabled'
                control={
                    <Radio
                        name='shipping-address'
                        value={props.address.id}
                        checked={props.selected === props.address.id}
                        color='primary'
                        onChange={changeHandler}
                    />
                }
                label={
                    <div className={styles.content}>
                        <Typography variant='subtitle1'>{props.address.address}</Typography>
                        <Typography variant='subtitle2' color='textSecondary'>
                            Phone: {props.address.phone}
                        </Typography>
                    </div>
                }
            />
        </ListItem>
    )
}
