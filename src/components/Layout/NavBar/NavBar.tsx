import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri'
import { SearchInput } from '../../UI/Search'
import classes from './NavBar.module.scss'
import { ProductArrayResponse } from '../../../interfaces/ProductArrayResponse'
import { useFetch } from '../../../hooks/Fetch/useFetch'
import { DropDown } from '../../UI/DropDown'

interface Props {}

export const NavBar: React.FC<Props> = props => {
    const [search, setSearch] = useState<string>('')
    const {
        state: { data, error, loading },
        fetchData
    } = useFetch<ProductArrayResponse>()

    const searchProductsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search) fetchData(`${process.env.REACT_APP_API_URL}/product?filters=${search}`)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [search, fetchData])

    useEffect(() => {
        console.log(data, error, loading)
    }, [data, error, loading])

    return (
        <header className={classes.root}>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <DropDown label='Products'>
                        <Link to='/products/cpu'>CPU</Link>
                        <Link to='/products/gpu'>Graphics Card</Link>
                        <Link to='/products/case'>Case</Link>
                        <Link to='/products/motherboard'>Motherboard</Link>
                        <Link to='/products/psu'>Power Supply</Link>
                        <Link to='/products/ram'>RAM</Link>
                        <Link to='/products/storage'>Storage</Link>
                    </DropDown>
                    <li>
                        <Link to='/pc-builder'>Build your PC</Link>
                    </li>
                </ul>
                <SearchInput onChange={searchProductsHandler} value={search} />
                <ul>
                    <li>
                        <Link to='/cart'>
                            <RiShoppingCartLine />
                        </Link>
                    </li>
                    <DropDown label='Profile'>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/sign-in'>Sign in</Link>
                    </DropDown>
                </ul>
            </nav>
        </header>
    )
}
