
import { Autocomplete, TextField, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Component for handling selection
 * Modifiable: YES
 * Can contain multiple selections (see: mui.com [API]) for reference. 
 * 
 * @params 
 *      - options (list) -> options in from the selection.
 *      - required (boolean) -> defines required state. (Note that form's noValidate attr can invalidate this)
 *      - onChange (function) - handles change event of the selection.
 *      - value (string) -> current value.
 * 
 * @returns <Form> (JSX element)
 */
export default function MuiStyledAutoComplete({
    options = [],
    required = false,
    value = undefined,
    onChange = () => {},
}) {

    const BASE_HEIGHT = 40;
    const MAX_ITEMS_TO_RENDER = 3;

    /**
     * :: Create reference
     * BASE_HEIGHT => list item height
     * MAX_ITEMS_TO_RENDER => max items before scroll effect
     * 16.7 (default) => excess padding from MUI.
     */
    const StyledPaper = styled(Paper)(
        ({ theme }) => ({
            background: theme.palette.grey["A200"],
            minHeight: 0,
            maxHeight: BASE_HEIGHT*MAX_ITEMS_TO_RENDER + (16.7) + "px",
            "& li": {
                height: BASE_HEIGHT,
            }
        })
    );

    /**
     * This overrides the default component of AutoComplete
     * @param {*} props 
     * @returns  <Paper/>
     */
    const PaperComponent = (props) => { 
        return <StyledPaper {...props} />
    };

    return (
        <Autocomplete
            disablePortal
            disableClearable
            PaperComponent={PaperComponent}
            autoComplete={true}
            options={options}
            onChange={onChange}
            value={value}
            popupIcon={<KeyboardArrowDownIcon />}
            className="styledAutoComplete"
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    required={required}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            )}
            sx={{
                width: 220,
                position: "relative",
                borderRadius: 4,
                height: BASE_HEIGHT,
                "& .MuiInputBase-root": {
                    padding: 0,
                    height: BASE_HEIGHT
                },
            }}
        />
    )
}