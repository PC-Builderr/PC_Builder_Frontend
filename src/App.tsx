import React, { FunctionComponent, lazy, LazyExoticComponent, Suspense } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Loader } from './components/UI/Loader'
import { useRefreshToken } from './hooks/Auth/useRefreshToken'
import { useCart } from './hooks/useCart'

const Home: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Home'))
const SignIn: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/SignIn'))
const SignUp: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/SignUp'))
const Product: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Product'))
const Products: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Products'))
const Profile: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Profile'))
const Builder: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Builder'))
const Cart: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Cart'))
const Checkout: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Checkout'))
const Error: LazyExoticComponent<FunctionComponent> = lazy(() => import('./pages/Error'))
const SearchResult: LazyExoticComponent<FunctionComponent> = lazy(
    () => import('./pages/SearchResult')
)

export const App: FunctionComponent = () => {
    useRefreshToken()

    const { pathname } = useLocation<Location>()

    const { items } = useCart()

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
                    <Route path='/pc-builder' exact>
                        <Builder />
                    </Route>
                    {items.length ? (
                        <>
                            <Route path='/cart' exact>
                                <Cart />
                            </Route>
                            <Route path='/checkout' exact>
                                <Checkout />
                            </Route>
                        </>
                    ) : null}
                    <Route path='/profile' exact>
                        <Profile />
                    </Route>
                    <Route path='/products' exact>
                        <SearchResult />
                    </Route>
                    <Route path='/products/:type' exact>
                        <Products key={pathname} />
                    </Route>
                    <Route path='/products/:type/:id' exact>
                        <Product />
                    </Route>
                    <Route path='/error'>
                        <Error />
                    </Route>
                    <Route>
                        <h3>NOT FOUND</h3>
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    )
}
