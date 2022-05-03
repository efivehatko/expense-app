import AddCircle from '@mui/icons-material/AddCircle'
import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AlertDialogSlide } from '../../components/AlertDialogSlide/AlertDialogSlide'
import { ColorPicker } from '../../components/ColorPicker/ColorPicker'
import { TextInput } from '../../components/TextField/TextInput'
import { add, remove, revive } from '../../redux/slices/categoriesSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { Category } from '../../types/CategoryTypes'
import { randColor } from '../../utils/categoriesHelper'
import CategoriesList from './CategoriesList'

interface Props {
    showTitle?: boolean
}

function Categories({ showTitle }: Props): JSX.Element {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [deleteAlert, setDeleteAlert] = useState<{
        delete: Category | null
        show: boolean
    }>({ show: false, delete: null })
    const dispatch = useAppDispatch()
    const categories = useAppSelector((state) => state.categories.list)
    const deletedCategories = useAppSelector(
        (state) => state.categories.deleted
    )
    const transactions = useAppSelector((state) => state.transactions.list)

    useEffect(() => {
        const existedColors = categories.map((c) => c.color)
        const randomColor = randColor(existedColors)
        setColor(randomColor)
        setName('')
    }, [categories])

    const onAdd = (category: string): void => {
        if (category) {
            // revive deleted category if name exists in deleted archieve
            if (deletedCategories.map((c) => c.label).includes(category)) {
                dispatch(revive(category))

                // alert when category already exists
            } else if (categories.map((c) => c.label).includes(category)) {
                // category exists
            } else {
                dispatch(
                    add({
                        label: category,
                        color,
                    })
                )
            }
        }
    }

    const onDelete = (category: Category): void => {
        const isExists = transactions.some(
            (t) => t.category.trim() === category.label.trim()
        )
        if (isExists) {
            setDeleteAlert({ show: true, delete: category })
        } else {
            dispatch(remove(category.id))
        }
    }

    return (
        <div className="categories">
            {showTitle && <h1 className="categories__title">Categories</h1>}
            <Stack direction="column" spacing={1}>
                <TextInput
                    className="categories__field"
                    name="Name"
                    label="Name"
                    size="small"
                    variant="outlined"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />
                <ColorPicker
                    fullWidth
                    name="color"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setColor(e.target.value)
                    }}
                    value={color}
                />
                <Button
                    variant="contained"
                    className="categories__buton"
                    aria-label="delete"
                    color="primary"
                    onClick={() => onAdd(name)}
                    startIcon={<AddCircle />}
                >
                    ADD
                </Button>
            </Stack>
            <CategoriesList onDelete={onDelete} />
            {deleteAlert && deleteAlert.show ? (
                <AlertDialogSlide
                    title="Delete"
                    content="Are you sure you want to delete category with existed transactions?"
                    onClose={() =>
                        setDeleteAlert({ show: false, delete: null })
                    }
                    onDecision={(decision) => {
                        if (decision) {
                            if (deleteAlert.delete)
                                dispatch(remove(deleteAlert.delete.id))
                        }
                    }}
                />
            ) : null}
        </div>
    )
}

export default Categories
