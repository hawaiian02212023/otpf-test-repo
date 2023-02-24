import React from 'react';
import { Snackbar, Paper } from '@mui/material';
import { theme, types } from '../../utilities';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * -- MuiStyledSnackbar component
 * This components relies to the parent component where it is wrappeed in.
 * See current config in theme.js ---
 * 
 * Use this Component to invoke popup notifications
 * 
 * @params 
 *    open (boolean) -> determines if the snackbar is visible or not.
 *    message (string) -> message displayed in the snackbar.
 *    severity (string) suggest: use ALERT_TYPES from utilities -> determines type of notification.
 *    onClose (function) -> reference to onClose function.
 * 
 * @returns MuiStyledSnackBar (JSX.element)
 */
export default function MuiStyledSnackBar({
  open = false,
  message = "",
  severity = "info",
  onClose = () => { }
}) {

  // global style for icon to be used in paper
  const iconStyle = {
    width: 21,
    height: 21
  }

  // current supported types
  const { success, error, warning } = types.ALERT;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}
      autoHideDuration={3000}
    >
      <Paper
        elevation={3}
        sx = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1.5,
          padding: 2,
          lineHeight: '1.25rem',
          color: '#FFF',
          backgroundColor: 
            severity === success ? 
              theme.palette.success.main : 
            severity === error ?
              theme.palette.error.main :
            severity === warning ?
              theme.palette.warning.main :
            '#FFF'
        }}
      >
          {
            severity === success ?
              <CheckCircleIcon sx={{...iconStyle}}/> :
            severity === error ?
              <ErrorIcon sx={{...iconStyle}}/> :
            severity === warning ?
              <WarningIcon sx={{...iconStyle}}/> :
            <></>
          }
          {message}
      </Paper>
    </Snackbar>
  );
}