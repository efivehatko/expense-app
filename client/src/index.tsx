import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Layout from './app'
import AlertSnackbar from './components/AlertSnackbar/AlertSnackbar'
import { RequireAuth } from './hoc/RequireAuth'
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
            <AlertSnackbar />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
