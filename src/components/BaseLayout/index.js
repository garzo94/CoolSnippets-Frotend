import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppHeader from "./AppHeader";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";



function BaseLayout() {
    

    return (
        <Box sx={{ display: "flex" }}>
            <AppHeader/>
            

           
                <Box
                    sx={{
                        flexGrow: 1,
                        minHeight: '100vh',
                        padding: 3,                                           
                    }}
                >
                    <Toolbar />
                    <Box >
                        <Outlet />
                    </Box>
                </Box>
            
        </Box>
    );
}

export default BaseLayout;
