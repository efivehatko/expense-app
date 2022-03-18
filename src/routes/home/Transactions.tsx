import { DatePicker } from '@mui/lab'
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    Select,
    TextField,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import React, { useState } from 'react'
import TransactionsList from './TransactionsList'
import { Category } from './Categories'
import { useAppSelector, useAppDispatch } from '../../redux/store/hooks'
import { add } from '../../redux/slices/transactionsSlice'

type categories = {
    categories: Category[]
    onChange: (e: SelectChangeEvent<string>) => void
}

function Categories({ categories, onChange }: categories): JSX.Element {
    const [value, setValue] = useState('')
    const handleChange = (e: SelectChangeEvent<string>): void => {
        setValue(e.target.value)
        onChange(e)
    }

    return (
        <FormControl size="small" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
                value={value}
                label="Category"
                name="Category"
                onChange={handleChange}
            >
                {categories.length ? (
                    categories.map((ca) => {
                        return (
                            <MenuItem key={ca.id} value={ca.id}>
                                {ca.label}
                            </MenuItem>
                        )
                    })
                ) : (
                    <MenuItem>No categories</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

function Transactions(): JSX.Element {
    const [date, setDate] = useState<Date | string>(new Date())
    const [amount, setAmount] = useState('')
    const [label, setLabel] = useState('')
    const [category, setCategory] = useState<Category>({
        id: 1,
        label: '',
        isDeleted: false,
    })

    const dispatch = useAppDispatch()

    const transactions = useAppSelector((state) => state.transactions.list)
    const categories = useAppSelector((state) => state.categories.list)

    const onCategoryChange = (e: SelectChangeEvent<string>): void => {
        const id = parseInt(e.target.value, 10)
        const changedCategory = categories.find((ca) => ca.id === id)
        if (changedCategory)
            setCategory({ id, label: changedCategory.label, isDeleted: false })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const newTransaction = {
            label,
            date,
            amount: parseInt(amount, 10),
            category: category.label,
        }

        dispatch(add(newTransaction))
    }

    return (
        <div className="transactions">
            <h1 className="transactions__title">Transactions</h1>
            <Grid container className="transactions__container" spacing={2}>
                <Grid
                    component="form"
                    padding={2}
                    item
                    container
                    spacing={2}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    onSubmit={handleSubmit}
                >
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            label="Label"
                            name="Label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={(newValue) =>
                                    setDate(
                                        new Date(
                                            newValue || new Date()
                                        ).toLocaleString('en-US')
                                    )
                                }
                                renderInput={(params) => (
                                    <TextField
                                        name="Date"
                                        required
                                        size="small"
                                        fullWidth
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item lg={2} md={4} sm={4} xs={12}>
                        <TextField
                            value={amount}
                            required
                            fullWidth
                            size="small"
                            label="Amount"
                            name="Amount"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4} xs={12}>
                        <Categories
                            onChange={onCategoryChange}
                            categories={categories}
                        />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4} xs={12}>
                        <Button fullWidth type="submit" variant="outlined">
                            ADD
                        </Button>
                    </Grid>
                </Grid>
                <Grid className="transactions__container__table" item xs={12}>
                    <TransactionsList rows={transactions} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Transactions
