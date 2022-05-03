import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../store'

export type AlertType = {
    severity: 'error' | 'warning' | 'info' | 'success'
    message: string
    timeout?: number
} | null

interface AlertState {
    open: boolean
    alert: AlertType
}

const initialState: AlertState = {
    open: false,
    alert: null,
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        show(state, action: PayloadAction<AlertType>) {
            state.alert = action.payload
            state.open = true
        },
        close(state) {
            state.open = false
        },
    },
})

export const alertActions = alertSlice.actions

const alertState = (state: RootState): AlertState => state.alert

export const alertSelector = createDraftSafeSelector(
    alertState,
    (state) => state
)

export default alertSlice.reducer
