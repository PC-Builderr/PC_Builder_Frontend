import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1e88e5'
        },
        secondary: {
            main: '#f44336'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1300,
            xl: 1920
        }
    }
})
