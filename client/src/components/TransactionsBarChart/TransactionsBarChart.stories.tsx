import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'
import { TransactionsBarChart } from './TransactionsBarChart'

const mockData = [
    {
        name: 'Gifts',
        value: -60.6,
        info: {
            id: 2,
            label: 'Gifts',
            color: '#FFBB28',
            isDeleted: false,
        },
    },
    {
        name: 'Traveling',
        value: -40,
        info: {
            id: 5,
            label: 'Traveling',
            color: '#F90194',
            isDeleted: true,
        },
    },
    {
        name: 'Going out',
        value: -30,
        info: {
            id: 4,
            label: 'Going out',
            color: '#0088FE',
            isDeleted: false,
        },
    },
    {
        name: 'Food',
        value: -5,
        info: {
            id: 3,
            label: 'Food',
            color: '#00C49F',
            isDeleted: false,
        },
    },
    {
        name: 'Salary',
        value: 400,
        info: {
            id: 1,
            label: 'Salary',
            color: '#FF8042',
            isDeleted: true,
        },
    },
]

export default {
    title: 'Components/TransactionsBarChart',
    component: TransactionsBarChart,
    args: {
        data: mockData,
    },
} as ComponentMeta<typeof TransactionsBarChart>

const Container = styled.div`
    height: 80vh;
`

const Template: ComponentStory<typeof TransactionsBarChart> = (args) => (
    <Container>
        <TransactionsBarChart {...args} />
    </Container>
)

export const Story = Template.bind({})
Story.args = {}
