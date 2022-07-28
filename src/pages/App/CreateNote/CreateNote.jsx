import React from 'react'
import SideBar from './SideBar'
import RightBar from './RightBar'
import Main from './Main'
import {Box} from '@mui/material'


export default function CreateNote() {
  return (
    <Box sx={{display:'flex'}}>
        <SideBar/>
        <Main/>
        <RightBar/>
    </Box>


  )
}
