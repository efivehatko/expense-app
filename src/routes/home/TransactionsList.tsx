/* eslint-disable import/named */
import React from 'react'
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridValueFormatterParams,
} from '@mui/x-data-grid'
import { useAppSelector } from '../../redux/store/hooks'
import { Category, isCategoryDeleted } from './Categories'

const generateColumns = (
    deletedCategories: Category[],
    existedCategories: Category[]
): GridColDef[] => {
    const columns: GridColDef[] = [
        {
            field: 'id',
            hide: true,
        },
        {
            field: 'color',
            headerName: '',
            width: 20,
            renderCell: (params: GridRenderCellParams): JSX.Element | null => {
                if (existedCategories) {
                    const categoryName = params.row.category
                    const isDeleted = isCategoryDeleted(
                        categoryName,
                        deletedCategories
                    )

                    const color = isDeleted
                        ? 'gainsboro'
                        : existedCategories.find(
                              (ca) => categoryName === ca.label
                          )?.color

                    return (
                        <div
                            className="category-color-cell"
                            style={{ backgroundColor: color }}
                        />
                    )
                }

                return null
            },
            align: 'center',
        },
        {
            field: 'label',
            headerName: 'Label',
            editable: false,
        },
        {
            field: 'date',
            headerName: 'Date',
            valueFormatter: (params: GridValueFormatterParams) => {
                if (params.value) {
                    const dateFormat = new Date(
                        params.value.toString()
                    ).toLocaleDateString()
                    return dateFormat
                }

                return params.value
            },
        },
        {
            field: 'amount',
            headerName: 'Amount',
        },
        {
            width: 250,
            field: 'category',
            headerName: 'Category',
            renderCell: (params: GridRenderCellParams) => {
                const isDeleted = isCategoryDeleted(
                    params.row.category,
                    deletedCategories
                )
                return (
                    <p
                        style={
                            isDeleted
                                ? {
                                      textDecoration: 'line-through',
                                      textDecorationColor: 'red',
                                  }
                                : {}
                        }
                    >
                        {params.row.category}
                    </p>
                )
            },
        },
    ]

    return columns
}

export type Transaction = {
    label: string
    date: string
    amount: string
    category: string
}

type Props = {
    rows: Transaction[]
}

function Toolbar(): JSX.Element {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor: 'whitesmoke',
            }}
        >
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </div>
    )
}

function TransactionsList({ rows }: Props): JSX.Element {
    const deletedCategories = useAppSelector(
        (state) => state.categories.deleted
    )
    const categories = useAppSelector((state) => state.categories.list)

    return (
        <div className="transactions__container__list">
            <h1 className="transactions__container__list__title">
                Transactions List
            </h1>
            <DataGrid
                components={{
                    Toolbar,
                }}
                className="transactions__container__list__table"
                rows={rows}
                columns={generateColumns(deletedCategories, categories)}
                disableSelectionOnClick
            />
        </div>
    )
}

export default TransactionsList
