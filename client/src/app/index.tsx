import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserAvatar } from '../components/UserAvatar/UserAvatar'
import { authSelector } from '../redux/slices/authSlice'
import { useAppSelector } from '../redux/store/hooks'
import routes from '../routes'
import { Body } from './layout/Body'
import { Container } from './layout/Container'
import { Header } from './layout/Header'
import { NavLinks } from './layout/NavLinks'

function Layout(): JSX.Element {
    const { info } = useAppSelector(authSelector)

    return (
        <>
            <Header>
                <NavLinks />
                <UserAvatar />
            </Header>
            <Body>
                <Container>
                    <Routes>
                        {routes.map((route) => route.routeComponent)}
                        <Route
                            path="*"
                            element={<Navigate to="/expense-app" />}
                        />
                    </Routes>
                </Container>
            </Body>
        </>
    )
}

export default Layout
