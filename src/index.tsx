import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import { CartContextProvider } from './context/Cart/CartContextProvider'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <CartContextProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </CartContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
