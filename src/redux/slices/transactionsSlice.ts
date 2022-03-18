import { createSlice } from '@reduxjs/toolkit'

export type Transaction = {
    label: string
    date: string
    amount: string
    category: string
}

interface transactionsState {
    list: Transaction[]
}

const initialState = {
    list: [],
} as transactionsState

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

export const { add } = transactionsSlice.actions

export default transactionsSlice.reducer
