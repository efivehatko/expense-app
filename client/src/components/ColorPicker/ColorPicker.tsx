import styled from 'styled-components'
import React from 'react'

const ColorInput = styled.input`
    cursor: pointer;
    -webkit-appearance: none;
    border: none;
    flex: 1;

    &::-webkit-color-swatch-wrapper {
        padding: 1px;
        border: none;
    }

    &::-webkit-color-swatch {
        border: none;
    }
`
const Label = styled.label`
    flex: 2;
    color: rgba(0, 0, 0, 0.6);
`

const Wrapper = styled.div<{ fullWidth: boolean }>`
    width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    padding: 7px 14px;
`

type Props = {
    name?: string
    value: string
    label?: string
    fullWidth?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ColorPicker = ({
    name = 'color',
    value,
    label = 'Pick Color',
    fullWidth = false,
    onChange,
}: Props): JSX.Element => {
    return (
        <Wrapper fullWidth={fullWidth}>
            <Label htmlFor={name}>{label}</Label>
            <ColorInput
                id={name}
                type="color"
                name={name}
                onChange={onChange}
                value={value}
            />
        </Wrapper>
    )
}
