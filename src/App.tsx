import React, { FunctionComponent, lazy, LazyExoticComponent, Suspense, useContext } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Loader } from './components/UI/Loader'
import { AuthContext } from './context/Auth/AuthContext'
import { AuthContextInterface } from './context/Auth/AuthContext.interface'
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

    const { authState } = useContext<AuthContextInterface>(AuthContext)

    const { items } = useCart()

    const { pathname } = useLocation<Location>()

    return (
        <Layout>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    {!authState ? (
                        <Route path='/sign-in' exact>
                            <SignIn />
                        </Route>
                    ) : null}
                    {!authState ? (
                        <Route path='/sign-up' exact>
                            <SignUp />
                        </Route>
                    ) : null}
                    <Route path='/pc-builder' exact>
                        <Builder />
                    </Route>
                    {items ? (
                        <Route path='/cart' exact>
                            <Cart />
                        </Route>
                    ) : null}
                    {items ? (
                        <Route path='/checkout' exact>
                            <Checkout />
                        </Route>
                    ) : null}
                    {authState ? (
                        <Route path='/profile' exact>
                            <Profile />
                        </Route>
                    ) : null}
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
