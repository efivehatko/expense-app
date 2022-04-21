import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import routes from '../routes'
import './index.scss'

const LogoutButton = styled.button`
    position: absolute;
    right: 0;
    border-radius: 10px 0 0 10px;
    color: #1876d2;
    background-color: white;
    outline: none;
    padding: 1vh;
    border: none;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
        background-color: gainsboro;
    }
`

function Layout(): JSX.Element {
    return (
        <div className="layout">
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
                <span className="help-Ukraine__text">#standwithukraine</span>
                <div className="help-Ukraine__flag">
                    <div className="help-Ukraine__flag__blue" />
                    <div className="help-Ukraine__flag__yellow" />
                </div>
            </a>
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
                <LogoutButton>Logout</LogoutButton>
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
