import { AccountCircle } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { authActions, authSelector } from '../../redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'

const Root = styled.div`
    position: absolute;
    right: 0;
    padding: 1vh;
`

const Username = styled.p`
    text-align: center;
    padding: 5px;
    margin: 5px;
    color: #1876d2;
    border-radius: 8px;
    border: 1px solid #1876d2;
    font-weight: bold;
`

export const UserAvatar: React.FC = () => {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const { info } = useAppSelector(authSelector)

    const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (): void => {
        setAnchorEl(null)
    }

    const handleLogout = (): void => {
        dispatch(authActions.logout())
    }

    return (
        <Root>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="default"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Username>{info?.username}</Username>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Root>
    )
}
