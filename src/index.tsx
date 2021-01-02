import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import { Layout } from './components/Layout'
import { CartContextProvider } from './context/Cart/CartContextProvider'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CartContextProvider>
                <BrowserRouter>
                    <Layout>
                        <App />
                    </Layout>
                </BrowserRouter>
            </CartContextProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
