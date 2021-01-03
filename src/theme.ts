import { blue } from '@material-ui/core/colors'
import { createMuiTheme, Theme } from '@material-ui/core/styles'

export const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: blue['700'],
            dark: blue['800']
        }
    },
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(', '),

        h1: {
            fontSize: '3.2rem',
            fontWeight: 300
        },
        h2: {
            fontSize: '2.8rem',
            fontWeight: 300
        },
        h3: {
            fontSize: '2.2rem',
            fontWeight: 300
        },
        h4: {
            fontSize: '1.8rem',
            fontWeight: 300
        },
        h5: {
            fontSize: '1.3rem',
            fontWeight: 700
        },
        h6: {
            fontSize: '1.2rem',
            fontWeight: 400,
            lineHeight: 1.2
        },
        subtitle1: {},
        subtitle2: {},
        body1: {
            fontSize: '1.1rem',
            fontWeight: 300
        },
        body2: {
            fontSize: '1rem',
            fontWeight: 300
        },
        caption: {
            fontSize: '0.8rem',
            fontWeight: 300,
            lineHeight: 1
        },
        overline: {}
    }
})
