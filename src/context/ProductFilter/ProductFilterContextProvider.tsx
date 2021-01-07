import React, { useState } from 'react'
import { ProductFilterContext } from './ProductFilterContext'

interface Props {
    children: React.ReactNode
}

export const ProductFilterContextProvider: React.FC<Props> = props => {
    const [filters, setFilters] = useState<any>({})

    return (
        <ProductFilterContext.Provider value={{ filters, setFilters }}>
            {props.children}
        </ProductFilterContext.Provider>
    )
}
