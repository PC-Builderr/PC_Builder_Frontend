import React from 'react'
import { ObjectLiteralElement } from 'typescript'
import { ProductFilterContextInterface } from './ProductFilterContextInterface'

export const ProductFilterContext = React.createContext<ProductFilterContextInterface>({
    filters: {},
    setFilters: (filters: any) => {}
})
