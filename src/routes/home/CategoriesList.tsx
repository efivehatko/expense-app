import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Category } from './Categories'
import { useAppSelector } from '../../redux/store/hooks'
import { CategoryItem } from '../../components/Category/CategoryItem'

export type CategoriesListProps = {
    onDelete: (category: Category) => void
}

function CategoriesList({ onDelete }: CategoriesListProps): JSX.Element {
    const categories = useAppSelector((state) => state.categories.list)

    return (
        <List className="categories__list">
            {categories.length ? (
                categories.map((category) => {
                    return (
                        <CategoryItem category={category} onDelete={onDelete} />
                    )
                })
            ) : (
                <ListItem className="categories__list__item" disablePadding>
                    <ListItemText primary="No categories" />
                </ListItem>
            )}
        </List>
    )
}

export default CategoriesList
