import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import './index.scss'
import ReBarChart from '../../components/ReBarChart'
import { useAppSelector } from '../../redux/store/hooks'
import PieCategories from './PieCategories'
import { Category } from '../home/Categories'

export type ChartData = {
    name: string
    value: number
    info: Category | undefined
}[]

function Graphs(): JSX.Element {
    const transactions = useAppSelector((state) => state.transactions.list)
    const categories = useAppSelector((state) => state.categories.list)
    const deletedCategories = useAppSelector(
        (state) => state.categories.deleted
    )
    const [chartData, setChartData] = useState<ChartData>([])

    useEffect(() => {
        if (categories && deletedCategories && transactions) {
            const data: ChartData = Array.from(
                new Set(transactions.map((t) => t.category))
            ).map((ca) => {
                return {
                    name: ca,
                    value: transactions
                        .filter((t) => t.category === ca)
                        .map((t) => t.amount)
                        .reduce((acc, current) => acc + Number(current), 0),
                    info: [...deletedCategories, ...categories].find(
                        (category) => category.label === ca
                    ),
                }
            })
            setChartData(data)
        }
    }, [categories, deletedCategories, transactions])

    if (!transactions.length) {
        return (
            <div className="no-data">
                <h1 className="no-data__title">No transactions</h1>
                <p className="no-data__description">
                    transactions not found, page requires transactions data to
                    render graphs
                </p>
            </div>
        )
    }

    const spended = transactions
        .map((t) => Number(t.amount))
        .filter((n) => n < 0)
        .reduce((acc, c) => acc + Number(c), 0)
        .toFixed(2)
    const income = transactions
        .map((t) => Number(t.amount))
        .filter((n) => n > 0)
        .reduce((acc, c) => acc + Number(c), 0)
        .toFixed(2)
    const profit = transactions
        .map((t) => Number(t.amount))
        .reduce((acc, c) => acc + Number(c), 0)
        .toFixed(2)

    return (
        <div className="graphs">
            <div className="graphs__container">
                <div className="graphs__container__categories">
                    <h1 className="graph-top-left">Categories popularity</h1>
                    <PieCategories />
                </div>
                <div className="graphs__container__analytics">
                    <h1 className="graph-top-left">Analytics</h1>
                    <ReBarChart data={chartData} />
                </div>
                <div className="graphs__container__summary">
                    <div className="graphs__container__summary__income">
                        <span className="name">Income</span>
                        <span className="value">+{income}</span>
                    </div>
                    <div className="graphs__container__summary__spended">
                        <span className="name">Spended</span>
                        <span className="value">{spended}</span>
                    </div>
                    <div className="graphs__container__summary__profit">
                        <span className="name">profit</span>
                        <span className="value">{profit}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default {
    name: 'graphs',
    path: '/graphs',
    routeComponent: <Route path="/graphs" key="graphs" element={<Graphs />} />,
}
