import React, {useState} from 'react'
import {Grid, Card, 
    CardActions, 
    CardContent, 
    CardMedia,
    IconButton,
    Typography,
    Box,
    Modal
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Image from '../assets/Image.jpg'
import { theme } from '../../styles/createTheme';
import {ThemeProvider} from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { SpeedDialActionStyled } from '../../styles/createTheme';
import { TooltipCustomized } from '../../styles/createTheme';


const actions = [
  { icon: <DownloadIcon />, name: 'Download' },
  { icon: <EditIcon />, name: 'Edit' },
  { icon: <DeleteIcon />, name: 'Delete' },
  
  
];

export function BasicSpeedDial() {
  return (
  
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position:'absolute', ml: 2 ,bottom:32, left:'80%', }}
        icon={<SpeedDialIcon sx={{color:'white'}} />}
        FabProps={{
          sx: {
            bgcolor: 'secondary.main',
            '&:hover': {
              bgcolor: 'secondary.main',
            }
          }
        }}
        
      >
        {actions.map((action) => (
          <SpeedDialActionStyled
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            color='secondary'
            // TooltipClasses={'.MuiTooltip-tooltip':{color:'red'}}
            
            
            
            sx={{ color:`${theme.palette.secondary.main}`,}}
          />
        ))}
      </SpeedDial>
    
  );
}

export default function CardNote() {
  const [open, setOpen] = useState(false)
  function handleOpen(){
    setOpen(!open)
  }

  const modal = (

    <Modal
  open={open}
  onClose={handleOpen}
  
>
  <Box sx={{
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height:'90%',
  background: 'white',
  borderRadius:'15px',
  boxShadow: 24,
  p: 4,
  zIndex:'tooltip',
  objectFit:'contain',
  display:'flex',
  justifyContent:'center',
  alignContent:'end',
  backgroundSize:'contain'
}}>
  
    <Box component="img"
          // maxWidth:'100%', width: '500px'
          backgroundSize='contain'
          sx={{borderRadius:'15px', backgroundSize:'contain',maxWidth:'100%', height:'auto', boxShadow:'10px 10px 5px rgba(25, 51, 77, 0.4) ' }}
          src={Image}
          alt="img">     
    </Box>
    <BasicSpeedDial sx={{ bgcolor:'red'}}/>
  </Box>
</Modal>
  )

    
  return (

    <ThemeProvider theme={theme}>
      

      <Grid container spacing={2} sx={{mt:10, width:'100%',display:'flex', justifyContent:'center', }}>
              <Grid item lg={3} xs={8} sx={{position:'relative', display:'flex', justifyContent:'center'}}>
              {modal}
                <Card sx={{ 
                    maxWidth: 250,  
                    p:2 ,
                    WebkitBackdropFilter:'blur(15px)',
                    backdropFilter:'blur(15px)',
                    background:'linear-gradient(180deg,rgba(41, 0, 102, 0.6),rgba(25, 51, 77, 0.8))',
                    cursor:'pointer',
                    borderRadius:'20px',
                    transition: '0.5s',
                 
                    '&:hover':{
                      background:'linear-gradient(180deg,rgba(41, 0, 102, 0.5),rgba(25, 51, 77, 0.7))',
                      boxShadow: '0 0 15px #19334d, 0 0 10px #21ebff' 
                    }
                  
                    }}
                    onClick={handleOpen}
                    >
                  <CardMedia
                      component="img"
                      height="140"
                      image={Image}
                      alt="img"
                      sx={{borderRadius:'20px'}}
                  />
                  <CardContent sx={{textAlign:'center', color:'white'}}>
                    <Typography gutterBottom variant="h5" component="div" sx={{m:0,p:0,fontWeight:'700'}}>
                      Python
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{mt:0, mb:0, p:0, fontSize:17}}>
                      Pandas
                    </Typography>
                    <Typography  gutterBottom variant="body2" component="div"  sx={{mt:0, p:0, fontSize:14, fontStyle:'italic'}}>
                      Lizards are a widespread group of 
                    </Typography>
                  </CardContent>
                  <CardActions sx={{dispaly:'flex', justifyContent:'center', mb:0, pb:0}}>
                    <TooltipCustomized title='Edit' color='primary' sx={{color:'red',}}>
                    <IconButton ><EditIcon color='secondary'/></IconButton>
                    </TooltipCustomized>

                    <TooltipCustomized title='Delete'>
                      <IconButton><DeleteIcon color='secondary'/></IconButton>                    
                    </TooltipCustomized>

                      <TooltipCustomized title='Download'>
                      <IconButton><DownloadIcon color='secondary'/></IconButton>
                      </TooltipCustomized>
                     
                      
                                    
                  </CardActions> 

                  </Card>
               
                  
              </Grid>  
  
            
          </Grid>
    </ThemeProvider>
    
  )
}