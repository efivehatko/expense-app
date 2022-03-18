import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import routes from '../routes'
import './index.scss'

function Layout(): JSX.Element {
    return (
        <div className="layout">
            <header className="layout__header">
                {routes.map((route) => {
                    return (
                        <Link
                            className="layout__header__link"
                            key={route.name}
                            to={route.path}
                        >
                            {route.name}
                        </Link>
                    )
                })}
                <a
                    href="https://war.ukraine.ua/support-ukraine/"
                    target="_blank"
                    className="help-Ukraine"
                    rel="noreferrer"
                >
                    <div className="help-Ukraine__flag">
                        <div className="help-Ukraine__flag__blue" />
                        <div className="help-Ukraine__flag__yellow" />
                    </div>
                    <span className="help-Ukraine__text">
                        #standwithukraine
                    </span>
                </a>
            </header>
            <div className="layout__body">
                <div className="layout__body__container">
                    <Routes>
                        {routes.map((route) => route.routeComponent)}
                        <Route
                            path="*"
                            element={<Navigate to="/expense-app" />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Layout
