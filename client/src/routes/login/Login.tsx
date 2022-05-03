import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { alertActions } from '../../redux/slices/alertSlice'
import { authActions } from '../../redux/slices/authSlice'
import { useAppDispatch } from '../../redux/store/hooks'
import { handleSignIn } from '../../utils/signInHelper'

const Container = styled.div`
    height: 100vh;
    background-color: #1876d2;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    height: 40vh;
    width: 40vh;
    background-color: white;
    box-shadow: 10px 10px 0 5px #79adff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2vh;
    padding: 2vh;
`

export type SignInFormValues = {
    username: string
    password: string
}

export const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm<SignInFormValues>({
        mode: 'onChange',
    })
    const onSubmit = (data: SignInFormValues): void => {
        handleSignIn(data).then((response) => {
            if (response.user) {
                dispatch(authActions.signIn(response.user))
                dispatch(
                    alertActions.show({
                        severity: 'success',
                        message: `Successfully signed in as ${response.user.username}`,
                    })
                )
                navigate('/')
            } else {
                dispatch(
                    alertActions.show({
                        severity: 'error',
                        message: 'Invalid credentials',
                    })
                )
            }
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4">Sign in</Typography>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'required' }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            type="text"
                            fullWidth
                            label="Username"
                            size="small"
                            variant="outlined"
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'required' }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            type="password"
                            fullWidth
                            label="Password"
                            size="small"
                            variant="outlined"
                        />
                    )}
                />
                <Button type="submit" fullWidth variant="outlined">
                    Sign In
                </Button>
            </Form>
        </Container>
    )
}
