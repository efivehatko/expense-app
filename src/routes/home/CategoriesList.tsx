import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import Delete from '@mui/icons-material/Delete'
import { Category } from './Categories'
import { useAppSelector } from '../../redux/store/hooks'

type CategoriesListProps = {
    onDelete: (category: Category) => void
}

function CategoriesList({ onDelete }: CategoriesListProps): JSX.Element {
    const categories = useAppSelector((state) => state.categories.list)

    return (
        <List className="categories__list">
            {categories.length ? (
                categories.map((category) => {
                    return (
                        <ListItem
                            key={category.id}
                            className="categories__list__item"
                            disablePadding
                            secondaryAction={
                                <IconButton
                                    onClick={() => onDelete(category)}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <div
                                className="categories__list__item__color"
                                style={{ backgroundColor: category.color }}
                            />
                            <p className="categories__list__item__text">
                                {category.label}
                            </p>
                        </ListItem>
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
