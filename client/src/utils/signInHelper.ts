import axios from 'axios'
import { SignInFormValues } from '../routes/login/Login'
import { User } from '../types/UserType'

export type SignInResponse = {
    code: number
    message: string
    user?: User
}

export const handleSignIn = async ({
    username,
    password,
}: SignInFormValues): Promise<SignInResponse> => {
    const checkUsername = await axios.get<User[]>(`/users?username=${username}`)
    const response = checkUsername.data
    if (response.length) {
        if (password === response[0].password) {
            const user = response[0]
            return {
                code: 200,
                message: 'Signed in successfully',
                user,
            }
        }
    }

    return {
        code: 401,
        message: 'Invalid credentials',
    }
}
