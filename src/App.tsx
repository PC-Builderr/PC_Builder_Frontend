import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProductCard } from './components/Products/ProductCard'
import { useFetch } from './hooks/Fetch/useFetch'
import { Product } from './interfaces/Product'
import { ProductArrayResponse } from './interfaces/ProductArrayResponse'

interface Props {}

export const App: React.FC<Props> = () => {
    const {
        state: { data, error, loading },
        fetchData
    } = useFetch<ProductArrayResponse>()

    useEffect(() => {
        fetchData('http://localhost:4000/api/product')
    }, [fetchData])

    let products: Product[] = []
    if (data) {
        products = data.products
    }

    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Suspense fallback={'...Loading'}>
                        {error ? (
                            <Redirect to='error' />
                        ) : (
                            products.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </Suspense>
                </Route>
                <Route path='/sign-in' exact>
                    <h3>sign in</h3>
                </Route>
                <Route path='/sign-up' exact>
                    <h3>sign up</h3>
                </Route>
                <Route path='/cart' exact>
                    <h3>cart</h3>
                </Route>
                <Route path='/products' exact>
                    <h3>All Products</h3>
                </Route>
                <Route path='/products/:type' exact>
                    <h3>Products with type</h3>
                </Route>
                <Route path='/products/:type/:id' exact>
                    <h3>id</h3>
                </Route>
                <Route path='/error' exact>
                    <h3>Error</h3>
                </Route>
            </Switch>
        </Layout>
    )
}
