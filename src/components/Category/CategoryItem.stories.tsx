import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { CategoryItem } from './CategoryItem'

const mockCategories = [
    {
        id: 1,
        label: 'Category one',
        color: 'skyblue',
        isDeleted: false,
    },
    {
        id: 2,
        label: 'Category two',
        color: 'orange',
        isDeleted: false,
    },
    {
        id: 3,
        label: 'Category three',
        color: 'lightgreen',
        isDeleted: false,
    },
]

export default {
    title: 'Components/CategoryItem',
    component: CategoryItem,
} as ComponentMeta<typeof CategoryItem>

const Wrapper = styled.div<{ border?: boolean }>`
    padding: 1vh;
    height: 50vh;
    ${(props) =>
        props.border
            ? `
    border: 1px solid gainsboro;
    border-radius: 8px;
    `
            : null}
    width: 40vh;
`

const Template: ComponentStory<typeof CategoryItem> = (args) => (
    <Wrapper>
        <CategoryItem {...args} category={mockCategories[0]} />
    </Wrapper>
)

const ListTemplate: ComponentStory<typeof CategoryItem> = (args) => (
    <Wrapper border>
        {mockCategories.map((category) => (
            <CategoryItem {...args} category={category} />
        ))}
    </Wrapper>
)

export const InList = ListTemplate.bind({})
InList.args = {}

export const Default = Template.bind({})
Default.args = {}
