import React from 'react'
import Filters from './Filters'
import {Link} from 'react-router-dom'
import { Typography,Box, } from '@mui/material'
import {theme} from '../../styles/createTheme'
import { ButtonCustomized } from '../../styles/createTheme'

import {ThemeProvider } from '@mui/material/styles';
import CardNote from './Card'


export default function Dashboard() {

  return (
    <div style={{ padding:2, position: 'relative'}}>
      <ThemeProvider theme={theme} >
        <Box sx={{
        position: 'absolute',
        width:{ lg:1000, md:1200, sm:900, xs:600},
        height:{ lg:800, md:700, sm:600, xs: 500},
        borderRadius:'48% 52% 29% 71% / 38% 2% 98% 62% ',
        background:'linear-gradient(0.50turn,#290066,#19334d)',
        top: {lg:'-15rem',md:'-10rem', sm:'-8rem', xs:'-5rem'},
        left:{lg:'30rem', md:'0.5rem', sm:'-2rem', xs:'-2rem'},
        overflow: 'hidden',




         }}></Box>

        <Filters ></Filters>
        <Typography  variant="h5" sx={{
          color:`${theme.palette.secondary.main}`,
          fontFamily:'Nanum Gothic Coding',
          mt:2,
          fontSize:{lg:45, md:30, sm:28, xs:18},
          fontWeight:{lg:'700', md:'600', sm:'500', xs:'400'},
          color:{xl:theme.palette.secondary.main,lg:theme.palette.secondary.main,md:'#fff', sm:'#fff', xs:"#fff"},
          ml:5,
          position:'relative',
          zIndex:'mobileStepper'
          }}>
                Your Notes of...
        </Typography>
        <Box sx={{
          display:"flex",
          justifyContent: "flex-end", mb: 3, mt:3, mr:5
        }}>
          <ButtonCustomized
          component={Link}
          variant="contained"
          to="/create-note">
            Create Note
          </ButtonCustomized>

      </Box>

      <CardNote/>


      </ThemeProvider>

    </div>




  )
}
