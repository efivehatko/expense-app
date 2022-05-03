import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { ColorPicker } from './ColorPicker'

export default {
    title: 'Components/ColorPicker',
    component: ColorPicker,
    argTypes: {
        value: {
            control: { type: 'color' },
        },
    },
    args: {
        name: 'color',
        label: 'Pick Color',
    },
} as ComponentMeta<typeof ColorPicker>

const Template: ComponentStory<typeof ColorPicker> = (args) => {
    const [color, setColor] = React.useState('skyblue')
    return (
        <ColorPicker
            {...args}
            value={color}
            onChange={(e) => setColor(e.target.value)}
        />
    )
}

export const Default = Template.bind({})
Default.args = {}
