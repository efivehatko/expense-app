import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import alertSlice from '../slices/alertSlice'
import userSlice from '../slices/authSlice'
import categoriesSlice from '../slices/categoriesSlice'
import transactionsSlice from '../slices/transactionsSlice'

const reducers = combineReducers({
    alert: alertSlice,
    user: userSlice,
    categories: categoriesSlice,
    transactions: transactionsSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})

export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
