import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Box,
    CircularProgress,
    
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";

import useRequestAuth from "../../pages/hooks/useRequestAuth";





export function AppHeader() {
   

    const {logout, logoutPending} = useRequestAuth();

    const handleLogout = ()=>{
        logout()
    }
    const authLinks = (
        <Box sx={{ 
         display: "flex",
         alignItems: "center", 
         justifyContent:"center",
         cursor:'pointer', 
         borderRadius:'20px',
         color:'white',
       
         "&:hover":{backgroundColor:'rgba(25, 51, 77,0.4)',transition:'0.8s'},
        "&:hover:after":{transition:'0.8s'}
        }}
         onClick={handleLogout}>
            
            <IconButton              
                color="inherit"
                size="large"
                sx={{padding:0, margin:1,}}
            >
                <LogoutIcon sx={{height:'25px', width:'25px'}}/>
            </IconButton>
            
             
                 
            {logoutPending ? <CircularProgress size={20} sx={{
                mr:1, pr:1
            }}/> : <Typography variant='h6'sx={{mr:1, pr:1, fontSize:20, fontFamily:'Nanum Gothic Coding',
            fontSize: {
                lg: 25,
                md: 20,
                sm: 18,
                xs: 15
                
              },}}>Log out</Typography>}         
        </Box>
    );

    return (
        <AppBar
            position="fixed"
            sx={{
                background:'linear-gradient(0.25turn,#290066,1%,#19334d,80%,#21ebff)', 
                boxShadow:'1px 1px 12px #290066',
                bgcolor: '#fff'
            
            }}
        >
            <Toolbar sx={{mr: {md:10, lg:15}, ml: {md:10, lg:15}}}>
                
                <Typography variant="h4" noWrap sx={{ flexGrow: 1,
                    fontFamily:'Nanum Gothic Coding',
                    color:'white',
                    fontSize: {
                        lg: 30,
                        md: 25,
                        sm: 20,
                        xs: 15
                        
                      },
                    }}>
                    My programing Notes
                </Typography>
                {authLinks}
            </Toolbar>
            
        </AppBar>
    );
}



export default AppHeader;
