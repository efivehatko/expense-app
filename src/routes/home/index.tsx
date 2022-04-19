import { Grid } from '@mui/material'
import React from 'react'
import { Route } from 'react-router-dom'
import Categories, { Category } from './Categories'
import Transactions from './Transactions'
import './index.scss'
import { Accordions } from '../../components/Accordions/Accordions'

type Categories = Category[]

function Home(): JSX.Element {
    if (window.innerWidth < 900) {
        return (
            <>
                <Accordions
                    openFirst
                    containerProps={{ style: { padding: '1vh' } }}
                    accordions={[
                        {
                            summary: 'Categories',
                            content: <Categories />,
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
