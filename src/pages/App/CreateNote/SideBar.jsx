import React, { useState, useContext } from "react";
import { Box, Paper, Button } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import ShortTextIcon from "@mui/icons-material/ShortText";
import TwitterIcon from "@mui/icons-material/Twitter";
import { theme } from "../../../styles/createTheme";
import { ThemeProvider } from "@mui/material";
import Popover from "@mui/material/Popover";
import useText from "./Context";
import Grid from "@mui/material/Grid";
import { dataBackground } from "./backgroundData";

export default function SideBar() {
  // background --------
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    addText,
    addTitle,
    addTextFunc,
    addTitleFunc,
    changeBack,
    changeBackground,
  } = useText();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  function handleBackground(k) {
    changeBackground(k);
  }
  // const id = open ? 'simple-popover' : undefined;

  // Add text/title ----
  function handleAddButton(e) {
    if (String(e.target.className).includes("title")) {
      addTitleFunc();
    }
    if (String(e.target.className).includes("text")) {
      addTextFunc();
    }
    // addTextFunc();
    // addTitleFunc();
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "200px",
          height: "85vh",
          background: "linear-gradient(45deg,#290066,5%,#19334d)",
          borderRadius: "15px",
          textAlign: "center",
          mt: 6,
          mr: 3,
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            startIcon={<TitleIcon />}
            className="title"
            color="primary"
            variant="outlined"
            sx={{
              width: "80%",
              marginX: "auto",
              mt: 5,
              textTransform: "capitalize",
              borderRadius: "10px",
            }}
            onClick={(e) => handleAddButton(e)}
            disabled={addTitle}
          >
            Add Title
          </Button>
          <Button
            className="text"
            startIcon={<ShortTextIcon />}
            color="primary"
            variant="outlined"
            sx={{
              width: "80%",
              marginX: "auto",
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "10px",
              // "&.Mui-disabled": { color: "black" },
            }}
            onClick={(e) => handleAddButton(e)}
            disabled={addText}
          >
            Add Text
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleClick}
            sx={{
              textTransform: "capitalize",
              mt: 2,
              marginX: "auto",
              width: "80%",
              borderRadius: "10px",
              "&:hover": { boxShadow: "3px 2px 5px #21ebff" },
            }}
          >
            Background
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              sx={{ flexGrow: 1, height: "10rem", overflow: "auto", p: "2px" }}
            >
              <Grid container spacing={1}>
                {Object.entries(dataBackground).map(([k, v]) => {
                  return (
                    <Grid item key={k} xs={4}>
                      <Box
                        sx={{
                          height: "50px",
                          widht: "50px",
                          background: v,
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                        onClick={(e) => handleBackground(k)}
                      ></Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Popover>

          <Button
            startIcon={<TwitterIcon />}
            color="primary"
            variant="outlined"
            sx={{
              width: "70%",
              marginX: "auto",
              mt: 28,
              textTransform: "capitalize",
              borderRadius: "10px",
            }}
          >
            Add Twitter Profile
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
