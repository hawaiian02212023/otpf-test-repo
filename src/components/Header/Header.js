import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
/**
 * -- Header component
 *  : Header container
 * @params None
 * @returns <Header> (JSX element)
 */
export default function Header() {

    const theme = useTheme();

    return (
        <Typography 
            variant='h5'
            component='header'
            sx={{
                background: theme.palette.primary.main,
                color: theme.palette.common.white,
                width: "100%",
                padding: "10px"
            }}
        >
                OTPF
        </Typography>
    )
}