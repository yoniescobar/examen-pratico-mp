import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles


export default function Navbar() {
  return (
    <AppBar position='fixed' color='primary'>
        <Toolbar>
            <Typography variant='h6'>
                    Developer: Yoni Edilzar Escobar
            </Typography>
        </Toolbar>
    </AppBar>
  )
}
