import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'

import { AlertDialogSlide } from './AlertDialogSlide'

export default {
    title: 'Components/AlertDialogSlide',
    component: AlertDialogSlide,
    args: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacus sed purus porta scelerisque at eget velit.',
        yes: 'yes',
        no: 'no',
    },
} as ComponentMeta<typeof AlertDialogSlide>

const Template: ComponentStory<typeof AlertDialogSlide> = (args) => {
    const [open, setOpen] = useState(true)
    return (
        <>
            <button onClick={() => setOpen(true)} type="button">
                Open
            </button>
            {open ? (
                <AlertDialogSlide {...args} onClose={() => setOpen(false)} />
            ) : null}
        </>
    )
}

export const Standard = Template.bind({})
Standard.args = {}
