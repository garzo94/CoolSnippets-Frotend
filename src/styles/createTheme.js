import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import {  styled } from '@mui/material/styles';
import {Button, Select, SpeedDialAction} from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const theme = createTheme({
    palette: {
      mode: 'light',
      primary:{
        main:'#21ebff',
        
  
      },
      secondary:{
        main:"#19334d",
        
      },

      tertiary:{
        main:'#290066'
      }
  
    },
    
  })

  export const ButtonCustomized = styled(Button)(({theme})=>({
    position: 'relative',
    padding: '10px 30px',
    margin: '0 15px',
    letterSpacing: '2px',
    fontSize: '20px',
    color: '#21ebff',
    transition: '0.5s',
    backgroundColor: 'rgba(33, 235, 255, 0.2)',
    WebkitBoxReflect: 'below 1px linear-gradient(transparent,#0003)',

    
   
    '&:hover':{
      background: '#21ebff',
      color: '#111',
      boxShadow: '0 0 25px #21ebff',
      transitionDelay: '0.5s'
    },
    '&:before':{
      content: '""',
      position:'absolute',
      top: 0,
      left: 0,
      width: '15px',
      height: '15px', 
      borderTop: '2px solid #21ebff',
      borderLeft: '2px solid #21ebff',
      transition: '0.5s',
      transitionDelay: '0s'
     
    },

    '&:hover:before':{
      width: '100%',
      height: '100%',
     
    },
    '&:after':{
      content: '""',
      position:'absolute',
      bottom: 0,
      right: 0,
      width: '15px',
      height: '15px', 
      borderBottom: '2px solid #21ebff',
      borderRight: '2px solid #21ebff',
      transition: '0.5s',
      transitionDelay: '0s',
      
    },
    '&:hover:after':{
      width: '100%',
      height: '100%',
     
    },

  }))

  export const SpeedDialActionStyled = styled(SpeedDialAction)(({theme})=>({
    '&.MuiTooltip-tooltip':{color:'red', bgcolor:'red'},
    '&.MuiTooltip-popper':{color:'red', bgcolor:'red'},
    '.MuiTooltip-popperInteractive':{color:'red', bgcolor:'red'}
  }))

  export const SelectCustomized = styled(Select)(({theme})=>({
    "&.MuiOutlinedInput-root": {
      "& .MuiSelect-select": {
        color: theme.palette.primary.main
      },
      // "&:hover fieldset": {
      //   borderColor: "transparent"
      // },
      // "&.Mui-focused fieldset": {
      //   borderColor: "transparent"
      // }
    },
    '& .MuiSvgIcon-root':{ color: theme.palette.primary.main},
    
   

  }))

  export const TooltipCustomized = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  
  

 
