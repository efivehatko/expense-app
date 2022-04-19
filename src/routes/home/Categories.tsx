import { Button, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddCircle from '@mui/icons-material/AddCircle'
import CategoriesList from './CategoriesList'
import { AlertDialogSlide } from '../../components/AlertDialogSlide/AlertDialogSlide'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { add, remove, revive } from '../../redux/slices/categoriesSlice'
import { TextInput } from '../../components/TextField/TextInput'
import { ColorPicker } from '../../components/ColorPicker/ColorPicker'

export type Category = {
    id: number
    label: string
    color: string
    isDeleted: boolean
}

export function isCategoryDeleted(
    name: string,
    deletedCategories: Category[]
): boolean {
    return deletedCategories.map((c) => c.label).includes(name)
}

const randColor = (existedColors: string[]): string => {
    const color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()}`

    if (existedColors.includes(color)) randColor(existedColors)

    return color
}

function Categories(): JSX.Element {
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
        if (
            transactions.some(
                (t) => t.category.trim() === category.label.trim()
            )
        ) {
            setDeleteAlert({ show: true, delete: category })
        } else {
            dispatch(remove(category.id))
        }
    }

    return (
        <div className="categories">
            <h1 className="categories__title">Categories</h1>
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
