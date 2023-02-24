import { createTheme } from "@mui/material/";

/** 
 * -- Theme
 * Override defaults
 * Use this file for global theme configurations
 * MUi components inherits this styles.
 * 
 * @returns theme (object)
 */
const theme = createTheme({
    palette: {
        primary: {
            main: "#307BC0"
        },
    },
    typography: {
        fontSize: 12,
        h5: {
            '@media (min-width:2560px)': {
                fontSize: '2.75rem',
                padding: 15
            }, 
        },
        h6: {
            '@media (min-width:320px)': {
                fontSize: '1.2rem',
            },
            '@media (min-width:768px)': {
                fontSize: '1.35rem',
            },
            '@media (min-width:1440px)': {
                fontSize: '1.5rem',
            },
            '@media (min-width:2560px)': {
                fontSize: '2.6rem',
            },
        },
        subtitle1: {
            '@media (min-width:1440px)': {
                fontSize: '1rem',
            },
            '@media (min-width:2560px)': {
                fontSize: '1.785rem',
            },
        }
    },
    components: {
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    position: "absolute",
                    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
                },
                anchorOriginTopRight: {
                    transform: "translate(23px, -23px)",
                },
                anchorOriginTopLeft: {
                    transform: "translate(-23px, -23px)"
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                message: {
                    paddingRight: 6
                }
            }
        },
    },
});

export default theme;
