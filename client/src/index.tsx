import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { RequireAuth } from './hoc/routing/RequireAuth'
import Layout from './layout'
import store from './redux/store/index'
import { Login } from './routes/login/Login'
import './styles/global.scss'

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<h1>loading</h1>} persistor={persistor}>
            <HashRouter>
                <CssBaseline />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="*"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Layout />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </HashRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
