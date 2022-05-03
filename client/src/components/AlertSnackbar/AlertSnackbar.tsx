import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { alertActions, alertSelector } from '../../redux/slices/alertSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'

const DEFAULT_ALERT_TIMEOUT = 3000

const AlertSnackbar: React.FC = () => {
    const dispatch = useAppDispatch()
    const { alert, open } = useAppSelector(alertSelector)

    const handleClose = (): void => {
        dispatch(alertActions.close())
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={alert?.timeout || DEFAULT_ALERT_TIMEOUT}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={alert?.severity}
                sx={{ width: '100%' }}
            >
                {alert?.message}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar
