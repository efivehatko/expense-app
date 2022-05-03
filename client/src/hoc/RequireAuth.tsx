import React from 'react'
import { Navigate } from 'react-router-dom'
import { authSelector } from '../redux/slices/authSlice'
import { useAppSelector } from '../redux/store/hooks'

type Props = {
    children: JSX.Element
    redirectTo: string
}
export const RequireAuth: React.FC<Props> = ({ children, redirectTo }) => {
    const { loggedIn: isAuthenticated } = useAppSelector(authSelector)
    return isAuthenticated ? children : <Navigate to={redirectTo} />
}
