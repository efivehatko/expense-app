import { Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { signIn } from '../../redux/slices/userSlice'
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
    const { register, handleSubmit } = useForm<SignInFormValues>({
        mode: 'onChange',
    })
    const onSubmit = (data: SignInFormValues): void => {
        // handle auth
        handleSignIn(data).then((response) => {
            if (response.user) {
                dispatch(signIn(response.user))
                navigate('/')
            }
            // alert with error message
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('username')}
                    type="text"
                    fullWidth
                    label="Username"
                    size="small"
                    variant="outlined"
                />
                <TextField
                    {...register('password')}
                    type="password"
                    fullWidth
                    label="Password"
                    size="small"
                    variant="outlined"
                />
                <Button type="submit" fullWidth variant="outlined">
                    Sign In
                </Button>
            </Form>
        </Container>
    )
}
