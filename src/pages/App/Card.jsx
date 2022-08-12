import React, { useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { theme } from "../../styles/createTheme";
import { ThemeProvider } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { SpeedDialActionStyled } from "../../styles/createTheme";
import { TooltipCustomized } from "../../styles/createTheme";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

export default function CardNote({
  image,
  language,
  topic,
  subtopic,
  description,
  handleDelete,
  id,
}) {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  function handleOpen() {
    setOpen(!open);
  }

  const downloadImage = () => {
    setOpen(false);
    saveAs(image, "image.jpg");
  };
  const speedD = (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", ml: 15, bottom: 0, left: "80%" }}
      icon={<SpeedDialIcon sx={{ color: "white" }} />}
      FabProps={{
        sx: {
          bgcolor: "secondary.main",
          "&:hover": {
            bgcolor: "secondary.main",
          },
        },
      }}
    >
      <SpeedDialActionStyled
        key="Download"
        icon={<DownloadIcon />}
        tooltipTitle="Download"
        color="secondary"
        // TooltipClasses={'.MuiTooltip-tooltip':{color:'red'}}
        sx={{ color: `${theme.palette.secondary.main}` }}
      />
      <SpeedDialActionStyled
        key="Delete"
        icon={<DeleteIcon />}
        tooltipTitle="Delete"
        color="secondary"
        onClick={() => {
          handleDelete(id);
        }}
        // TooltipClasses={'.MuiTooltip-tooltip':{color:'red'}}
        sx={{ color: `${theme.palette.secondary.main}` }}
      />
      <SpeedDialActionStyled
        key="Edit"
        icon={<EditIcon />}
        tooltipTitle="Edit"
        color="secondary"
        // TooltipClasses={'.MuiTooltip-tooltip':{color:'red'}}
        sx={{ color: `${theme.palette.secondary.main}` }}
      />
    </SpeedDial>
  );
  const modal = (
    <Modal open={open} onClose={handleOpen} id={id}>
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "90%",
          background: "white",
          borderRadius: "15px",
          boxShadow: 24,
          p: 4,
          zIndex: "tooltip",
          objectFit: "contain",
          display: "flex",
          justifyContent: "center",
          alignContent: "end",
          backgroundSize: "contain",
        }}
      >
        <Box
          component="img"
          // maxWidth:'100%', width: '500px'
          backgroundSize="contain"
          sx={{
            borderRadius: "15px",
            backgroundSize: "contain",
            maxWidth: "100%",
            height: "auto",
            boxShadow: "10px 10px 5px rgba(25, 51, 77, 0.4) ",
          }}
          src={image}
          alt="img"
        ></Box>
        {speedD}
      </Box>
    </Modal>
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid
        item
        lg={3}
        md={6}
        xs={8}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {modal}
        <Card
          sx={{
            maxWidth: 250,

            p: 2,
            WebkitBackdropFilter: "blur(15px)",
            backdropFilter: "blur(15px)",
            background:
              "linear-gradient(180deg,rgba(41, 0, 102, 0.6),rgba(25, 51, 77, 0.8))",

            borderRadius: "20px",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="img"
            sx={{ borderRadius: "20px", cursor: "pointer" }}
            onClick={handleOpen}
          />
          <CardContent sx={{ textAlign: "center", color: "white", mb: "auto" }}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ m: 0, p: 0, fontWeight: "600", fontSize: 30 }}
            >
              {language.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ mt: 0, mb: 0, p: 0, fontWeight: "400" }}
            >
              {topic !== null ? topic.name : "....."}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ mt: 0, mb: 0, p: 0, fontSize: 14 }}
            >
              {subtopic !== null ? subtopic.name : "..."}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              mt: "auto",
              justifyContent: "center",
            }}
          >
            <TooltipCustomized
              title="Edit"
              color="primary"
              sx={{ color: "red" }}
            >
              <IconButton onClick={() => navigate(`/create-note/edit/${id}`)}>
                <EditIcon color="secondary" />
              </IconButton>
            </TooltipCustomized>

            <TooltipCustomized title="Delete">
              <IconButton
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </TooltipCustomized>

            <TooltipCustomized title="Download">
              <IconButton onClick={downloadImage}>
                <DownloadIcon color="secondary" />
              </IconButton>
            </TooltipCustomized>
          </CardActions>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

CardNote.prototype = {
  language: PropTypes.string,
  topic: PropTypes.string,
  subtopic: PropTypes.string,
};
