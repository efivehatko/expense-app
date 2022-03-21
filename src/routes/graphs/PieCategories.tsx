import React, { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { useAppSelector } from '../../redux/store/hooks'
import { Category } from '../home/Categories'

interface ActiveShapeProps {
    cx: number
    cy: number
    innerRadius: number
    outerRadius: number
    startAngle: number
    endAngle: number
    fill: string
    payload: {
        name: string
        info: Category
    }
    percent: number
}

const renderActiveShape = (props: ActiveShapeProps): JSX.Element => {
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
    } = props

    return (
        <g>
            <text
                x={cx}
                y={cy + cy - 20}
                dy={8}
                style={{ fontSize: '2vh' }}
                {...(payload.info.isDeleted
                    ? { className: 'deleted-category' }
                    : null)}
                textAnchor="middle"
                fill={fill}
            >
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 4}
                outerRadius={outerRadius + 12}
                fill={fill}
            />
            <text
                x={cx}
                y={cy + 5}
                style={{ fontSize: '3vh' }}
                fill={fill}
                textAnchor="middle"
            >{`${(percent * 100).toFixed(2)}%`}</text>
        </g>
    )
}

function PieCategories(): JSX.Element {
    const [activeIndex, setActiveIndex] = useState(0)

    const onPieEnter = (entry: object, index: number): void => {
        setActiveIndex(index)
    }

    const categories = useAppSelector((state) => state.categories.list)
    const deletedCategories = useAppSelector(
        (state) => state.categories.deleted
    )
    const transactions = useAppSelector((state) => state.transactions.list)
    const data = Array.from(new Set(transactions.map((t) => t.category))).map(
        (ca) => {
            return {
                name: ca,
                value: transactions.filter((t) => t.category === ca).length,
                info: [...categories, ...deletedCategories].find(
                    (category) => category.label === ca
                ),
            }
        }
    )

    return (
        <ResponsiveContainer height="100%">
            <PieChart>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    innerRadius="50%"
                    outerRadius="70%"
                    data={data}
                    labelLine={false}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {data.map((entry) => {
                        return (
                            <Cell
                                key={`cell-${entry.info?.id}`}
                                fill={entry.info?.color}
                            />
                        )
                    })}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieCategories
