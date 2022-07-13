import React from 'react'
import {Box, Paper, Button} from '@mui/material'
import TitleIcon from '@mui/icons-material/Title';
import ShortTextIcon from '@mui/icons-material/ShortText';
import TwitterIcon from '@mui/icons-material/Twitter';
import { theme } from '../../../styles/createTheme';
import { ThemeProvider } from '@mui/material';

export default function SideBar() {
  return (

    <ThemeProvider theme={theme}>
              <Paper sx={{width:'15%',height:'85vh', background:'linear-gradient(45deg,#290066,5%,#19334d)', borderRadius:'10px', textAlign:'center'}} elevation={3}>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'start', width:'100%', height:'100%'}}>
            <Button startIcon={<TitleIcon/>} color='primary' variant="outlined" sx={{width:'80%', marginX:'auto',mt:5, textTransform:'capitalize'}}>
               Add Title
            </Button>
            <Button startIcon={<ShortTextIcon/>} color='primary' variant="outlined" sx={{width:'80%',marginX:'auto', mt:2,textTransform:'capitalize'}}>
                Add Text
            </Button>
            <Button color='primary'
                        variant='outlined'
                sx={{ textTransform:'capitalize',mt:2, marginX:'auto', width: '80%', "&:hover":{boxShadow:'3px 2px 5px #21ebff' }}}>
                Theme
            </Button>

            <Button startIcon={<TwitterIcon/>} color='primary' variant="outlined" sx={{width:'70%',marginX:'auto', mt:38,textTransform:'capitalize'}}>
             Add Twitter Profile
            </Button>



        </Box>
    </Paper>
    </ThemeProvider>




  )
}
