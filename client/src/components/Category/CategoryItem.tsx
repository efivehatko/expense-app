import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Category } from '../../types/CategoryTypes'

const Text = styled.p`
    flex: 3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    margin: 0 !important;
    background-color: white;
    padding: 0 1vh;
    user-select: none;
    color: slategray;
`

const ColorCircle = styled('div')<{ color: string }>`
    // flex: 1;
    background-color: ${(props) => props.color};
    transition: transform 0.3s;
    width: 10px !important;
    height: 10px !important;
    border-radius: 5px;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 0 1vh;
    margin-bottom: 1vh;
    box-shadow: 0px 1px 1px 1px gainsboro;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        .categories__list__item__color {
            transform: scale(1.3);
        }
    }
`

type Props = {
    category: Category
    onDelete: (category: Category) => void
}

export const CategoryItem = ({ category, onDelete }: Props): JSX.Element => {
    return (
        <Wrapper key={category.id}>
            <ColorCircle color={category.color} />
            <Text>{category.label}</Text>
            <IconButton
                sx={{ mr: '0' }}
                onClick={() => onDelete(category)}
                edge="end"
                aria-label="delete"
            >
                <Delete />
            </IconButton>
        </Wrapper>
    )
}
