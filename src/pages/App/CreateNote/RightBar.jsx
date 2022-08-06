import React, { useState, useEffect } from "react";
import { theme } from "../../../styles/createTheme";
import {
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Button,
  Modal,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { SelectCustomized } from "../../../styles/createTheme";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ButtonCustomized } from "../../../styles/createTheme";
import { Link, useParams } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";

export default function RightBar() {
  const {
    resource,
    getResource,
    languages,
    nested,
    subtopics,
    getProgramingLanguages,
    getLanguageTopicSubTopic,
    getSubTopics,
    addLanguage,
  } = useRequestResource({});

  const [proLanguage, setProLanguage] = useState(null);
  const [topic, setTopic] = useState(null);
  const [subTopic, setSubTopic] = useState(null);
  const [description, setDescription] = useState(null);
  const [dynamicText, setdynamicText] = useState(null);
  const [programingLanguage, setprogramingLanguage] = useState();
  const [languageAdded, setLanguageAdded] = useState("");
  const [add, setAdd] = useState(null);
  const { id } = useParams();
  function handleChange(event) {
    switch (event.target.name) {
      case "language":
        return setProLanguage(event.target.value);
      case "topic":
        return setTopic(event.target.value);
      case "subtopic":
        return setSubTopic(event.target.value);
    }
  }
  useEffect(() => {
    if (id) {
      getResource(id);
      getProgramingLanguages();
      getLanguageTopicSubTopic();
    }
  }, [id, add]);

  useEffect(() => {
    if (resource !== null) {
      var lan = resource.language;
      var top = resource.topic;
      getSubTopics({ query: `${lan.id}/${top.id}/` });
      setprogramingLanguage(lan.id);
      setDescription(resource.description);
    }
  }, [resource]);

  function handleTextFieldText(event) {
    setLanguageAdded(event.target.value);
    console.log(event.target.value, "language Added");
  }
  function handleDescription(event) {
    setDescription(event.target.value);
  }
  function handleAdd() {
    if (dynamicText === "language") {
      addLanguage({ name: languageAdded });
      getProgramingLanguages();
      setAdd([languageAdded]);
      handleOpen();
    }
  }
  // Delete Dialog Alert
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };
  //Modal Create language, topic or subtopic

  const [open, setOpen] = useState(false);
  function handleOpen(value) {
    switch (value) {
      case "language":
        setdynamicText(value);
      case "topic":
        setdynamicText(value);
      case "subtopic":
        setdynamicText(value);
      default:
        setOpen(!open);
    }
  }

  const addModal = (
    <Modal open={open} onClose={handleOpen}>
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "200px",
          borderRadius: "15px",
          boxShadow: 24,
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "tooltip",
          objectFit: "contain",
          backgroundSize: "contain",
          bgcolor: "rgba(255,255,255,0.9)",
          boxShadow: 24,
        }}
      >
        <TextField
          label={`Add a new ${dynamicText}`}
          variant="filled"
          color="secondary"
          focused
          value={languageAdded}
          onChange={handleTextFieldText}
          sx={{
            width: "80%",
            mt: 1,
            color: "white",
            "& label": { color: "#19334d" },
            "& input": { borderBottom: "1px solid #19334d" },
          }}
          inputProps={{ sx: { color: "#19334d" } }}
        />
        <Box>
          <Button
            color="secondary"
            onClick={handleOpen}
            sx={{ m: 3, backgroundColor: "rgba(25, 51, 77,0.1)" }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            sx={{ m: 3, backgroundColor: "rgba(25, 51, 77,0.1)" }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
  // Alert Dialog Format
  // const alertDelete = (
  //   <Dialog
  //     open={open}
  //     TransitionComponent={Transition}
  //     keepMounted
  //     onClose={handleCloseAlert}
  //     aria-describedby="alert-dialog-slide"
  //   >
  //     <DialogTitle>{"Are you sure you want to delete this?"}</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText id="alert-dialog-slide-description">
  //         If you delete this, all notes related to this programming language
  //         will be deleted too.
  //       </DialogContentText>
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={handleCloseAlert}>Yes, delete it!</Button>
  //       <Button onClick={handleCloseAlert}>No!</Button>
  //     </DialogActions>
  //   </Dialog>
  // );

  return (
    <ThemeProvider theme={theme}>
      {addModal}
      <Paper
        sx={{
          width: "250px",
          dispaly: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          height: "85vh",
          borderRadius: "15px",
          mt: 6,
          ml: 3,
          background: "linear-gradient(215deg,#290066,5%,#19334d )",
          boxShadow: "0 0 ",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ m: 4, color: "rgba(33, 235, 255, 0.8)", textAlign: "center" }}
          >
            {" "}
            Select a programing language, topic, subtopic or add a new one:
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 0.5,
            }}
          >
            <FormControl
              sx={{
                minWidth: "60%",
                borderRadius: "20px",
              }}
            >
              <InputLabel
                sx={{ color: theme.palette.primary.main, fontSize: 12 }}
                id="select-programing-language"
              >
                Language
              </InputLabel>
              <SelectCustomized
                labelId="language-label"
                label="Language"
                id="language"
                value={proLanguage ?? ""}
                onChange={handleChange}
                name="language"
                variant="outlined"
                size="small"
                sx={{ boxShadow: "0 0 5px #21ebff, 0 0 2px #290066" }}
                color={theme.secondary}
              >
                {languages.results.map((l) => {
                  return (
                    <MenuItem
                      key={l.id}
                      value={l.id}
                      onClick={() => handleMenuItem(l.name)}
                    >
                      {l.name}
                    </MenuItem>
                  );
                })}
              </SelectCustomized>
            </FormControl>
            <Tooltip title="Add a new programing language">
              <IconButton
                size="large"
                color="primary"
                onClick={() => handleOpen("language")}
              >
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1.5,
            }}
          >
            <FormControl
              sx={{
                minWidth: "60%",
                borderRadius: "20px",
              }}
            >
              <InputLabel
                sx={{ color: theme.palette.primary.main, fontSize: 12 }}
                id="topic"
              >
                Topic
              </InputLabel>
              <SelectCustomized
                labelId="topic"
                label="Topic"
                id="topic"
                value={topic ?? ""}
                onChange={handleChange}
                name="topic"
                variant="outlined"
                sx={{ boxShadow: "0 0 5px #21ebff, 0 0 2px #290066" }}
                color={theme.secondary}
                size="small"
              >
                {nested.results.map((n) => {
                  return n.id === programingLanguage
                    ? n.topic.map((t) => {
                        return (
                          <MenuItem value={t.id} key={t.id}>
                            {t.name}
                          </MenuItem>
                        );
                      })
                    : null;
                })}
              </SelectCustomized>
            </FormControl>
            <Tooltip title="Add a new Topic">
              <IconButton
                size="large"
                color="primary"
                onClick={() => handleOpen("topic")}
              >
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1.5,
            }}
          >
            <FormControl
              sx={{
                minWidth: "60%",
                borderRadius: "20px",
              }}
            >
              <InputLabel
                sx={{ color: theme.palette.primary.main, fontSize: 12 }}
                id="subTopic"
              >
                Subtopic
              </InputLabel>
              <SelectCustomized
                labelId="subtopic"
                label="Sub topic"
                id="topice"
                value={subTopic ?? ""}
                onChange={handleChange}
                name="subtopic"
                variant="outlined"
                sx={{ boxShadow: "0 0 5px #21ebff, 0 0 2px #290066" }}
                color={theme.secondary}
                size="small"
              >
                {subtopics.results.map((sub) => {
                  return (
                    <MenuItem value={sub.id} option={sub.name} key={sub.id}>
                      {sub.name}
                    </MenuItem>
                  );
                })}
              </SelectCustomized>
            </FormControl>
            <Tooltip title="Add a new Sub-topic">
              <IconButton
                size="large"
                color="primary"
                onClick={() => handleOpen("subtopic")}
              >
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <TextField
            id="standard-basic"
            label="Add a short description"
            variant="standard"
            onChange={handleDescription}
            value={description ?? ""}
            sx={{
              width: "90%",
              mt: 3,
              color: "white",
              "& label": { color: "primary.main" },
              "& input": { borderBottom: "1px solid #21ebff" },
            }}
            inputProps={{
              sx: { color: "rgba(33, 235, 255, 0.8)" },
              maxLength: 50,
            }}
          />

          <ButtonCustomized
            component={Link}
            variant="contained"
            sx={{ mt: 8, borderRadius: "10px" }}
            to="/create-note"
          >
            {id ? "Edit" : "Save"}
          </ButtonCustomized>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
