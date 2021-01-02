import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import { SearchInput } from '../../UI/Search'
import classes from './NavBar.module.scss'
import { ProductArrayResponse } from '../../../interfaces/ProductArrayResponse'
import { useFetch } from '../../../hooks/Fetch/useFetch'

interface Props {}

export const NavBar: React.FC<Props> = props => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [search, setSearch] = useState('')
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
                    <li className={classes.DropDown}>
                        <button
                            onClick={() => {
                                setIsOpen(f => !f)
                            }}
                        >
                            Products
                            <IoIosArrowDown
                                className={[classes.Icon, !isOpen ? '' : classes.Open].join(' ')}
                            />
                        </button>
                    </li>
                    <li>
                        <Link to='/pc-builder'>Build your PC</Link>
                    </li>
                </ul>
                <SearchInput onChange={searchProductsHandler} value={search} />
                <ul>
                    <li>
                        <Link to='/pc-builder'>
                            <RiShoppingCartLine />
                        </Link>
                    </li>
                    <li className={classes.DropDown}>
                        <button
                            onClick={() => {
                                setIsOpen(f => !f)
                            }}
                        >
                            Profile
                            <IoIosArrowDown
                                className={[classes.Icon, !isOpen ? '' : classes.Open].join(' ')}
                            />
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
