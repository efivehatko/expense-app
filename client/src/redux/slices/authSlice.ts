import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { User } from '../../types/UserType'
import { RootState } from '../store'

interface AuthState {
    loggedIn: boolean
    info?: User | null
}

const initialState: AuthState = {
    loggedIn: false,
}

export const userSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<User>) => {
            state.loggedIn = true
            state.info = action.payload
        },
        logout: (state) => {
            state.loggedIn = false
            state.info = null
        },
    },
})

const authState = (state: RootState): AuthState => state.user

export const authSelector = createDraftSafeSelector(authState, (state) => state)

export const authActions = userSlice.actions

export default userSlice.reducer
