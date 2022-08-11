import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Link,
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
         justifyContent:"center",
         alignItems:'center',
         cursor:'pointer',
         borderRadius:'20px',
         color:'white',
         ml:5,



         "&:hover":{backgroundColor:'rgba(25, 51, 77,0.4)',transition:'0.8s'},
        "&:hover:after":{transition:'0.8s'}
        }}
         onClick={handleLogout}>
           {
            logoutPending ?
            <CircularProgress size={35} sx={{
                mr:1, pr:1, color:'white'
            }}/> :
            <IconButton
                color="inherit"
                size="large"
                sx={{padding:0, margin:1,}}
            >
                <LogoutIcon sx={{height:'25px', width:'25px'}}/>
            </IconButton>
           }

            <Typography variant='h6'sx={{mr:1, pr:1, fontSize:20, fontFamily:"'Nanum Gothic Coding', monospace;",

            fontSize: {
                lg: 25,
                md: 20,
                sm: 18,
                xs: 15

              },}}>Log out</Typography>
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
            <Toolbar sx={{display:'flex',
            justifyContent:'space-around',}}>

                <Link variant="h4" href='/'noWrap sx={{
                    fontFamily:"'Nanum Gothic Coding', monospace;",
                    color:'white',
                    mr:5,
                    fontSize: {
                        lg: 30,
                        md: 25,
                        sm: 20,
                        xs: 15

                      },
                    }}>
                    MyCoolSnippet
                </Link>
                {authLinks}
            </Toolbar>

        </AppBar>
    );
}



export default AppHeader;
