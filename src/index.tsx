import { IconButton } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom'
import { VscChromeClose } from 'react-icons/vsc'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'
import { CartContextProvider } from './context/Cart/CartContextProvider'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { theme } from './theme'

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <CartContextProvider>
                <BrowserRouter>
                    <SnackbarProvider
                        maxSnack={3}
                        autoHideDuration={4000}
                        action={key => (
                            <IconButton
                                className='snackbar__close-btn'
                                aria-label='close'
                                color='inherit'
                            >
                                <VscChromeClose />
                            </IconButton>
                        )}
                    >
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
                    </SnackbarProvider>
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
