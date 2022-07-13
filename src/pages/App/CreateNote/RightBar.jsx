import React, {useState} from 'react'
import {Paper, Button} from '@mui/material'
import { theme } from '../../../styles/createTheme'
import { ThemeProvider } from '@mui/material'
import {
    FormControl,
    Box,
    InputLabel,
    MenuItem,
    Typography,
    IconButton,
    Tooltip
} from "@mui/material";
import { SelectCustomized } from '../../../styles/createTheme';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ButtonCustomized } from '../../../styles/createTheme';
import {Link} from 'react-router-dom'

export default function RightBar() {
  const [proLanguage, setProLanguage] = useState(null)
  const [topic, setTopic] = useState(null)
  const [subTopic, setSubTopic] = useState(null)
  function handleChange(event){
    console.log(event.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width:'20%',
      dispaly:'flex',
      flexDirection:'column',
      justifyContent:'center',
      textAlign:'center',
      alignItems:'center',
      height:'85vh',
      borderRadius:'15px',
      background:'linear-gradient(215deg,#290066,5%,#19334d )', boxShadow:'0 0 '}}>

        <Box sx={{ textAlign:'center'}}>
        <Typography variant='body2'  sx={{m:4, color:'rgba(33, 235, 255, 0.8)', textAlign:'center'}}> Select a programing language, topic, subtopic or add a new one:</Typography>

        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',mt: 0.5}}>
            <FormControl
                    sx={{
                        minWidth: '60%',
                        borderRadius: '20px',

                    }}
                >
                    <InputLabel sx={{color: theme.palette.primary.main, fontSize:12}} id="select-programing-language" >Programing Language</InputLabel>
                    <SelectCustomized
                    labelId="language-label"
                    label="Programing Language"
                    id="language"
                    value={proLanguage ?? ''}
                    onChange={handleChange}
                    name='language'
                    variant='outlined'
                    size= 'small'
                    sx={{boxShadow: '0 0 5px #21ebff, 0 0 2px #290066'  }}
                    color={theme.secondary}
                >
                    <MenuItem value='Python'>Python</MenuItem>
                    <MenuItem value='Javascript'>Javascript</MenuItem>
                    <MenuItem value='SQL'>SQL</MenuItem>
                    </SelectCustomized>
            </FormControl>
            <Tooltip title='Add a new programing language'>
                <IconButton size='large' color='primary'>
                    <AddBoxIcon/>
                </IconButton>
            </Tooltip>

        </Box>


        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',mt: 1.5}}>
            <FormControl
                    sx={{
                        minWidth: '60%',
                        borderRadius: '20px',
                    }}
                >
                    <InputLabel sx={{color: theme.palette.primary.main, fontSize:12}} id="topic" >Topic</InputLabel>
                    <SelectCustomized
                    labelId="topic"
                    label="Topic"
                    id="topic"
                    value={topic ?? ''}
                    onChange={handleChange}
                    name='toppic'
                    variant='outlined'
                    sx={{boxShadow: '0 0 5px #21ebff, 0 0 2px #290066'  }}
                    color={theme.secondary}
                    size= 'small'
                >
                        <MenuItem value='Python'>Python</MenuItem>
                        <MenuItem value='Javascript'>Javascript</MenuItem>
                        <MenuItem value='SQL'>SQL</MenuItem>
                    </SelectCustomized>

                </FormControl>
                <Tooltip title='Add a new Topic'>
                        <IconButton size='large' color='primary'>
                            <AddBoxIcon/>
                        </IconButton>
                </Tooltip>
        </Box>




        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',mt: 1.5}}>
         <FormControl
                sx={{
                    minWidth: '60%',
                    borderRadius: '20px',
                }}
            >
                 <InputLabel sx={{color: theme.palette.primary.main, fontSize:12}} id="subTopic" >Subtopic</InputLabel>
            <SelectCustomized
                labelId="subtopic"
                label="Sub topic"
                id="topice"
                value={subTopic ?? ''}
                onChange={handleChange}
                name='subtopic'
                variant='outlined'
                sx={{boxShadow: '0 0 5px #21ebff, 0 0 2px #290066'  }}
                color={theme.secondary}
                size= 'small'
            >
                <MenuItem value='Python'>Python</MenuItem>
                <MenuItem value='Javascript'>Javascript</MenuItem>
                <MenuItem value='SQL'>SQL</MenuItem>
            </SelectCustomized>
         </FormControl>
         <Tooltip title='Add a new Sub-topic'>
            <IconButton size='large' color='primary'>
                <AddBoxIcon/>
            </IconButton>
        </Tooltip>
        </Box>


            <TextField id="standard-basic" label="Add a description" variant="standard"
            sx={{width:'90%',mt:3, color:'white',"& label":{color:'primary.main'},"& input":{borderBottom:'1px solid #21ebff'}}}
            inputProps={{ sx: {color: 'rgba(33, 235, 255, 0.8)'} }}
            />

            <ButtonCustomized
            component={Link}
            variant="contained"
            sx={{mt:12}}
            to="/create-note">
                Create
          </ButtonCustomized>


      </Box>

      </Paper>

    </ThemeProvider>

  )
}
