import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { User } from '../../types/UserType'
import { RootState } from '../store'

interface UserState {
    loggedIn: boolean
    info?: User
}

const initialState: UserState = {
    loggedIn: false,
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<User>) => {
            state.loggedIn = true
            state.info = action.payload
        },
    },
})

const userState = (state: RootState): UserState => state.user

export const userSelector = createDraftSafeSelector(userState, (state) => state)

export const { signIn } = transactionsSlice.actions

export default transactionsSlice.reducer
