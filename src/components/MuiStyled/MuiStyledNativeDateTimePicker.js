import TextField from '@mui/material/TextField';
import { theme } from '../../utilities';

/**
 * Component for handling date and time (Native) selection.
 * 
 * @params 
 *     - defaultValue (string) -> renders initial date.
 *     - required (boolean) -> defines required state. (Note that form's noValidate attr can invalidate this)
 *     - inputRef (undefined | ref<useForm()> )-> current usage is for passing react-hook-form's exposed register()
 * 
 * @returns <MuiStyledNativeDateTimePicker> (JSX element)
 */
export default function MuiStyledNativeDateTimePicker({
    defaultValue = "",
    required = false,
    inputRef = undefined
}) {

    return (
        <TextField
            id="datetime-local"
            type="datetime-local"
            required={required}
            defaultValue={defaultValue}
            {...inputRef}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                step: 1,
            }}
            sx={{
                width: "220px",
                height: "40px",
                "& .MuiInputBase-root": {
                    fontSize: theme.typography.fontSize,
                    padding: "5px",
                    height: "40px",
                    "& .MuiInputBase-input": {
                        padding: "0px 5px",
                        height: "inherit"
                    }
                }
            }}
            
        />
    )
}