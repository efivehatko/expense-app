import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { Transaction } from '../../types/TransactionsTypes'
import { RootState } from '../store'

interface TransactionsState {
    list: Transaction[]
}

const initialState: TransactionsState = {
    list: [],
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        add: (state, action) => {
            const generateId = (): number => state.list.length + 1
            state.list.unshift({ id: generateId(), ...action.payload })
        },
    },
})

const transactionsState = (state: RootState): TransactionsState =>
    state.transactions

export const transactionsSelector = createDraftSafeSelector(
    transactionsState,
    (state) => state
)

export const { add } = transactionsSlice.actions

export default transactionsSlice.reducer
