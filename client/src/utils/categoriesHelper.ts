import { Category } from '../types/CategoryTypes'

export const isCategoryDeleted = (
    name: string,
    deletedCategories: Category[]
): boolean => {
    return deletedCategories.map((c) => c.label).includes(name)
}

export const randColor = (existedColors: string[]): string => {
    const color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()}`

    if (existedColors.includes(color)) randColor(existedColors)

    return color
}
