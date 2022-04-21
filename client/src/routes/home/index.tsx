import { Grid } from '@mui/material'
import React from 'react'
import { Route } from 'react-router-dom'
import { Accordions } from '../../components/Accordions/Accordions'
import { Category } from '../../types/CategoryTypes'
import Categories from './Categories'
import './index.scss'
import Transactions from './Transactions'

type Categories = Category[]

function Home(): JSX.Element {
    if (window.innerWidth < 900) {
        return (
            <>
                <Accordions
                    bigSummary
                    noBorders
                    openFirst
                    accordions={[
                        {
                            summary: 'Categories',
                            content: <Categories showTitle={false} />,
                        },
                    ]}
                />
                <Transactions />
            </>
        )
    }

    return (
        <Grid height="100%" container spacing={0}>
            <Grid
                height="100%"
                key="categories"
                lg={2}
                md={3}
                sm={12}
                xs={12}
                item
            >
                <Categories />
            </Grid>
            <Grid
                height="100%"
                key="graphs"
                lg={10}
                md={9}
                sm={12}
                xs={12}
                item
            >
                <Transactions />
            </Grid>
        </Grid>
    )
}

export default {
    name: 'home',
    path: '/',
    routeComponent: <Route path="/" key="home" element={<Home />} />,
}