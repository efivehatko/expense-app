import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import routes from '../../routes'

const StyledNavLink = styled(Link)`
    box-shadow: 0 0 0 0;
    text-transform: uppercase;
    text-decoration: none;
    color: white;
    font-size: 2vh;
    font-weight: 600;
    margin: 0 1vh;
    padding: 2px;
    margin-left: 4vh;
    transition: box-shadow 0.1s;

    &:hover {
        box-shadow: -2px 2px 0 2px;
    }
`

export const NavLinks: React.FC = () => {
    return (
        <>
            {routes.map((route) => (
                <StyledNavLink key={route.name} to={route.path}>
                    {route.name}
                </StyledNavLink>
            ))}
        </>
    )
}
