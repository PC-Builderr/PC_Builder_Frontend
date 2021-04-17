import {
    Button,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    TextField,
    Typography
} from '@material-ui/core'
import React, { FunctionComponent, useContext, useEffect } from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiAddCircleLine } from 'react-icons/ri'
import { Redirect } from 'react-router'
import { SelectComponent } from '../../components/Builder/SelectComponent/SelectComponent'
import { CheckoutProductCard } from '../../components/Products/ProductCard/CheckoutProductCard'
import { Header } from '../../components/UI/Header'
import { PrimaryButton } from '../../components/UI/PrimaryButton/PrimaryButton'
import { AuthContext } from '../../context/Auth/AuthContext'
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface'
import { useFetchCreateComputer } from '../../hooks/HTTP/useFetchCreateComputer'
import { useBuilder } from '../../hooks/useBuilder'
import { StorageFilters } from '../../hooks/useBuilder/components/storage/StorageFilters'
import { useCart } from '../../hooks/useCart'
import { Storage } from '../../types/components/Storage'
import styles from './Builder.module.scss'

interface Props {}

export const Builder: FunctionComponent<Props> = props => {
    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const {
        methods: { addItem }
    } = useCart()

    const {
        cpu: { cpuFilters, setCPU, cpu },
        chassis: { chassisFilters, setChassis, chassis },
        gpu: {
            methods: { addGPU, removeGPU, setGPU },
            state: { gpuFilters, gpuQuantity, gpu }
        },
        mobo: { moboFilters, setMobo, mobo },
        psu: { psuFilters, setPSU, psu },
        ram: {
            state: { ramFilters, ramQuantity, ram },
            methods: { decrementRam, incrementRam, setRam }
        },
        storage: {
            state: { storageFilters, storages },
            methods: { addStorage, removeStorage, setStorage }
        },
        computer: { price, computer, setName }
    } = useBuilder()

    const {
        methods: { createComputer },
        state: { data, loading }
    } = useFetchCreateComputer(computer)

    if (!authState) {
        return <Redirect to='/sign-in?to=pc-builder' />
    }

    return (
        <div className={styles.root}>
            <Header className={styles.Header}>Builder</Header>
            <Typography className={styles.MainLabel} variant='subtitle2' color='textSecondary'>
                Part Picker
            </Typography>
            <Card className={styles.Main} variant='outlined'>
                <CardContent>
                    <TextField
                        variant='outlined'
                        value={computer.name}
                        onChange={e => setName(e.target.value)}
                        label='Name'
                        fullWidth
                    />
                    <SelectComponent
                        component={cpu}
                        id='cpu'
                        filters={cpuFilters}
                        type='cpu'
                        setComponent={setCPU}
                    />
                    <div className={styles.Gpu}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={Boolean(gpuQuantity)}
                                    onChange={(_, checked: boolean) => {
                                        if (checked) {
                                            addGPU()
                                            return
                                        }
                                        removeGPU()
                                    }}
                                    name='GPU'
                                    color='primary'
                                />
                            }
                            label='Graphics card'
                        />
                        {gpuQuantity > 0 && (
                            <SelectComponent
                                component={gpu}
                                id='gpu'
                                filters={gpuFilters}
                                type='gpu'
                                setComponent={setGPU}
                            />
                        )}
                    </div>
                    <SelectComponent
                        component={mobo}
                        id='motherboard'
                        filters={moboFilters}
                        type='motherboard'
                        setComponent={setMobo}
                    />
                    <SelectComponent
                        component={ram}
                        id='ram'
                        filters={ramFilters}
                        type='ram'
                        setComponent={setRam}
                    />
                    <div className={styles.Actions}>
                        <IconButton color='inherit' onClick={decrementRam}>
                            <IoMdRemoveCircleOutline />
                        </IconButton>
                        <Typography variant='subtitle2'>{ramQuantity}</Typography>
                        <IconButton color='inherit' onClick={incrementRam}>
                            <RiAddCircleLine />
                        </IconButton>
                    </div>

                    <SelectComponent
                        component={chassis}
                        id='case'
                        filters={chassisFilters}
                        type='case'
                        setComponent={setChassis}
                    />
                    {storageFilters?.map((storageFilter: StorageFilters, index: number) => (
                        <SelectComponent
                            component={storages[index]}
                            key={index}
                            id={`storage${index}`}
                            filters={storageFilter}
                            type='storage'
                            setComponent={(storage: Storage | null) => setStorage(index, storage)}
                        />
                    ))}
                    <div className={styles.Actions}>
                        <IconButton color='inherit' onClick={removeStorage}>
                            <IoMdRemoveCircleOutline />
                        </IconButton>
                        <IconButton color='inherit' onClick={addStorage}>
                            <RiAddCircleLine />
                        </IconButton>
                    </div>
                    <SelectComponent
                        component={psu}
                        id='psu'
                        filters={psuFilters}
                        type='psu'
                        setComponent={setPSU}
                    />
                    <div className={styles.Buttons}>
                        <PrimaryButton
                            onClick={() => createComputer(true)}
                            loading={loading}
                            fullWidth={false}
                        >
                            Buy Now
                        </PrimaryButton>
                        <Button
                            onClick={() => createComputer(false)}
                            variant='outlined'
                            size='large'
                            color='primary'
                        >
                            Save Your Configuration
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Typography className={styles.SideLabel} variant='subtitle2' color='textSecondary'>
                Computer
            </Typography>
            <Card className={styles.Side} variant='outlined'>
                <CardContent>
                    <Typography variant='h6'>Computer Parts:</Typography>
                </CardContent>
                {cpu && (
                    <>
                        <Divider />
                        <CheckoutProductCard quantity={1} product={cpu.product} />
                    </>
                )}
                {gpu && (
                    <>
                        <Divider />
                        <CheckoutProductCard quantity={gpuQuantity} product={gpu.product} />
                    </>
                )}
                {mobo && (
                    <>
                        <Divider />
                        <CheckoutProductCard quantity={1} product={mobo.product} />
                    </>
                )}
                {ram && (
                    <>
                        <Divider />
                        <CheckoutProductCard quantity={ramQuantity} product={ram.product} />
                    </>
                )}
                {chassis && (
                    <>
                        <Divider />
                        <CheckoutProductCard quantity={1} product={chassis.product} />
                    </>
                )}
                {storages
                    .reduce((storageMap: [Storage, number][], storage: Storage | null): [
                        Storage,
                        number
                    ][] => {
                        if (!storage) {
                            return storageMap
                        }

                        const index: number = storageMap.findIndex(
                            ([s]: [Storage, number]) => s.productId === storage.productId
                        )

                        if (index === -1) {
                            return [...storageMap, [storage, 1]]
                        }

                        const record: [Storage, number] = storageMap[index]

                        return [
                            ...storageMap.slice(0, index),
                            [record[0], record[1] + 1],
                            ...storageMap.slice(index + 1)
                        ]
                    }, [])
                    .map(([{ product, productId }, quantity]: [Storage, number]) => (
                        <span key={productId}>
                            <Divider />
                            <CheckoutProductCard quantity={quantity} product={product} />
                        </span>
                    ))}
                {psu && (
                    <>
                        <Divider />
                        <CheckoutProductCard quantity={1} product={psu.product} />
                    </>
                )}
                <Divider />
                <div className={styles.Total}>
                    <Typography variant='body2'>Total Price:</Typography>
                    <h4>{price}лв.</h4>
                </div>
            </Card>
        </div>
    )
}
