import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: JSX.Element
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

type AlertDialogSlide = {
    title: string
    content: string
    yes?: string
    no?: string
    onDecision: (decision: boolean) => void
    onClose: () => void
}

export function AlertDialogSlide({
    title,
    content,
    yes = 'yes',
    no = 'no',
    onDecision,
    onClose,
}: AlertDialogSlide): JSX.Element {
    const [open, setOpen] = React.useState(true)

    const decisionYes = (): void => {
        onDecision(true)
        onClose()
    }

    const decisionNo = (): void => {
        onDecision(false)
        onClose()
    }

    const handleClose = (): void => {
        setOpen(false)
        onClose()
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={decisionNo}>
                        {no.toUpperCase()}
                    </Button>
                    <Button onClick={decisionYes}>{yes.toUpperCase()}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
