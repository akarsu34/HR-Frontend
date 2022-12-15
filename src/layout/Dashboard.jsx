import { Grid } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router'
import Sidebar from '../components/sidebar/Sidebar'
import CreateDayOff from './CreateDayOff'
import CreateDeveloper from './CreateDeveloper'
import CreateExpense from './CreateExpense'
import CreateOverShift from './CreateOverShift'
import MainPage from './MainPage'
import UpdateDayOff from './UpdateDayOff'
import UpdateExpense from './UpdateExpense'
import UpdateOverShift from './UpdateOverShift'
import UpdateDeveloper from './UpdateDeveloper'

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
        <Grid item xs={3}>
            <Sidebar />
        </Grid>        
        <Grid item xs={9}>
            <Routes>
                <Route exact path="/" element={<MainPage />} />

                <Route exact path='/kayıt' element={<CreateDeveloper />} />
                <Route exact path='/profil/:devId' element={<UpdateDeveloper />} />


                <Route exact path='/izin' element={<CreateDayOff />} />
                <Route exact path='/izin/:dayOffId' element={<UpdateDayOff />} />

                <Route exact path='/harcama' element={<CreateExpense />} />
                <Route exact path='/harcama/:expenseId' element={<UpdateExpense />} />

                <Route exact path='/mesai' element={<CreateOverShift />} />
                <Route exact path='/mesai/:overShiftId' element={<UpdateOverShift />} />

            </Routes>
        </Grid>
    </Grid>
    )
}
