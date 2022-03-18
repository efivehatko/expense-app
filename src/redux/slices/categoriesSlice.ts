import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Category = {
    id: number
    label: string
    isDeleted: boolean
    color: string
}

interface categoriesState {
    list: Category[]
    deleted: Category[]
}

const initialState = {
    list: [
        { id: 1, label: 'Salary', color: '#FF8042', isDeleted: false },
        { id: 2, label: 'Gifts', color: '#FFBB28', isDeleted: false },
        { id: 3, label: 'Food', color: '#00C49F', isDeleted: false },
        { id: 4, label: 'Going out', color: '#0088FE', isDeleted: false },
        { id: 5, label: 'Traveling', color: '#F90194', isDeleted: false },
    ],
    deleted: [],
} as categoriesState

export const categoriesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state: categoriesState, action) => {
            const generateId = (): number =>
                state.list.length + state.deleted.length + 1
            state.list.push({ id: generateId(), ...action.payload })
        },
        remove: (state: categoriesState, action: PayloadAction<number>) => {
            const cateogryToDelete = state.list.find(
                (c) => c.id === action.payload
            )

            if (cateogryToDelete) {
                cateogryToDelete.isDeleted = true
                state.deleted.push(cateogryToDelete)
                state.list = state.list.filter((ca) => ca.id !== action.payload)
            }
        },
        revive: (state: categoriesState, action: PayloadAction<string>) => {
            const categoryToRevive = state.deleted.find(
                (c) => c.label === action.payload
            )

            if (categoryToRevive) {
                state.list.push(categoryToRevive)
                state.deleted = state.deleted.filter(
                    (ca) => ca.label !== action.payload
                )
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { add, remove, revive } = categoriesSlice.actions

export default categoriesSlice.reducer
