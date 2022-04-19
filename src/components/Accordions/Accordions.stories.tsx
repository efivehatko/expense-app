import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Accordions } from './Accordions'

export default {
    title: 'Components/Accordions',
    component: Accordions,
} as ComponentMeta<typeof Accordions>

const Template: ComponentStory<typeof Accordions> = (args) => (
    <Accordions {...args} />
)

const accordionsMock = [
    {
        summary: 'Summary text one',
        content: <p>JSX content one</p>,
    },
    {
        summary: 'Summary text two',
        content: <p>JSX content two</p>,
    },
]

export const Basic = Template.bind({})
Basic.args = {
    openFirst: false,
    accordions: accordionsMock,
}

export const OpenFirst = Template.bind({})
OpenFirst.args = {
    openFirst: true,
    accordions: accordionsMock,
}

export const CustomContainer = Template.bind({})
CustomContainer.args = {
    openFirst: false,
    accordions: accordionsMock,
    containerProps: {
        style: { backgroundColor: 'teal', padding: '2vh', borderRadius: '1vh' },
    },
}
