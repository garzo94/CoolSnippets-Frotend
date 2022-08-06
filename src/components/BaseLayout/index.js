import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppHeader from "./AppHeader";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";

import LoadingOverlayResource from "../../pages/components/loadingOverlayResource";

function BaseLayout() {


    return (
        <Box sx={{ display: "flex" }}>
           <AppHeader/>


           <LoadingOverlayResource>
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
            </LoadingOverlayResource>

        </Box>
    );
}

export default BaseLayout;
