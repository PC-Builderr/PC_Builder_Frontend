import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Loader } from './components/UI/Loader'

const Home: React.LazyExoticComponent<React.FC<Props>> = lazy(() => import('./pages/Home'))
const SignIn: React.LazyExoticComponent<React.FC<Props>> = lazy(() => import('./pages/SignIn'))
const SignUp: React.LazyExoticComponent<React.FC<Props>> = lazy(() => import('./pages/SignUp'))
const Product: React.LazyExoticComponent<React.FC<Props>> = lazy(() => import('./pages/Product'))
const CPUProduct: React.LazyExoticComponent<React.FC<Props>> = lazy(
    () => import('./pages/Product/CPUProduct')
)
const Products: React.LazyExoticComponent<React.FC<Props>> = lazy(() => import('./pages/Products'))
const Error: React.LazyExoticComponent<React.FC<Props>> = lazy(() => import('./pages/Error'))

interface Props {}

export const App: React.FC<Props> = () => {
    return (
        <Layout>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/sign-in' exact>
                        <SignIn />
                    </Route>
                    <Route path='/sign-up' exact>
                        <SignUp />
                    </Route>
                    <Route path='/cart' exact>
                        <h3>cart</h3>
                    </Route>
                    <Route path='/products/:type' exact>
                        <Products />
                    </Route>
                    <Route path='/products/:type' exact>
                        <Products />
                    </Route>
                    <Route path='/products/cpu/:id' exact>
                        <CPUProduct />
                    </Route>
                    <Route path='/products/:type/:id' exact>
                        <Product />
                    </Route>
                    <Route path='/error'>
                        <Error />
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    )
}
