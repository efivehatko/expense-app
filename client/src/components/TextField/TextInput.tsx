import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

interface Props {
    name: string
    label: string
    size: 'small' | 'medium'
    variant: 'filled' | 'outlined' | 'standard'
}

export const TextInput = ({
    ...rest
}: Props &
    TextFieldProps &
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >): JSX.Element => {
    return <TextField {...rest} />
}
