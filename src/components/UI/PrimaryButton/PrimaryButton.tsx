import { Button, ButtonProps } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import styles from './PrimaryButton.module.scss'

interface Props extends ButtonProps {
    loading?: boolean
}

export const PrimaryButton: FunctionComponent<Props> = ({
    className,
    loading,
    children,
    ...props
}) => {
    return (
        <Button
            size='large'
            color='primary'
            variant='contained'
            className={[styles.root, className].join(' ')}
            fullWidth
            {...props}
        >
            {loading ? (
                <>
                    Processing <BiLoaderAlt className={styles.spinner} />
                </>
            ) : (
                children
            )}
        </Button>
    )
}
