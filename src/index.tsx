import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.scss'
import { HashRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './redux/store/index'
import Layout from './layout'

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<h1>loading</h1>} persistor={persistor}>
            <HashRouter>
                <CssBaseline />
                <Layout />
            </HashRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
