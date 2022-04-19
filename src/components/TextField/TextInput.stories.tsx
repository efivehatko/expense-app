import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { TextInput } from './TextInput'

export default {
    title: 'Components/TextInput',
    component: TextInput,
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100vh',
        }}
    >
        <TextInput {...args} label="outlined" variant="outlined" />
        <TextInput {...args} label="filled" variant="filled" />
        <TextInput {...args} label="standard" variant="standard" />
    </div>
)

export const Variants = Template.bind({})
Variants.args = {
    size: 'small',
}

Variants.argTypes = {
    variant: {
        table: {
            disable: true,
        },
    },
    label: {
        table: {
            disable: true,
        },
    },
    name: {
        table: {
            disable: true,
        },
    },
}
