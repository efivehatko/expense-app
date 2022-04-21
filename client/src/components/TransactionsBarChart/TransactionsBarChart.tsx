import React from 'react'
import {
    Bar,
    BarChart,
    Brush,
    CartesianGrid,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { BarChartData } from '../../types/BarChartTypes'

interface AxisTickProps {
    x: number
    y: number
    payload: {
        value: string
    }
}

function CustomizedAxisTick(props: AxisTickProps): JSX.Element {
    const { x, y, payload } = props
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
                {payload.value}
            </text>
        </g>
    )
}

export function TransactionsBarChart(props: {
    container?: object
    chart?: object
    data: BarChartData[]
}): JSX.Element {
    const { container, chart, data } = props

    return (
        <ResponsiveContainer height="100%" {...container}>
            <BarChart
                {...chart}
                data={data.length ? data : []}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={CustomizedAxisTick} />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={0} stroke="#000" />
                <Brush
                    travellerWidth={20}
                    dataKey="name"
                    height={30}
                    stroke="#8884d8"
                />
                <Bar dataKey="value" name="amount">
                    {data.map(({ info }) => {
                        if (info && info.color && info.label) {
                            return (
                                <Cell
                                    key={`cell-${info.label}`}
                                    fill={info.color}
                                />
                            )
                        }
                        return <Cell key="cell" fill="gainsboro" />
                    })}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
