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
        <header className={classes.Header}>
            <nav className={classes.Nav}>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <DropDown label='Products'>
                        <li>
                            <Link to='/products/cpu'>CPU</Link>
                        </li>
                        <li>
                            <Link to='/products/gpu'>Graphics Card</Link>
                        </li>
                        <li>
                            <Link to='/products/case'>Case</Link>
                        </li>
                        <li>
                            <Link to='/products/motherboard'>Motherboard</Link>
                        </li>
                        <li>
                            <Link to='/products/psu'>Power Supply</Link>
                        </li>
                        <li>
                            <Link to='/products/ram'>RAM</Link>
                        </li>
                        <li>
                            <Link to='/products/storage'>Storage</Link>
                        </li>
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
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/sign-in'>Sign in</Link>
                        </li>
                    </DropDown>
                </ul>
            </nav>
        </header>
    )
}
