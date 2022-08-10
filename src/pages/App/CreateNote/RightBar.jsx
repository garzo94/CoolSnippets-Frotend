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

import { SelectCustomized } from "../../../styles/createTheme";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ButtonCustomized } from "../../../styles/createTheme";
import { Link, useParams } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";
import useText from "./Context";
import { useSnackbar } from "notistack";

export default function RightBar() {
  const formData = new FormData();
  const { enqueueSnackbar } = useSnackbar();
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
    addTopic,
    addSubTopic,
    addSnippet,
  } = useRequestResource({});

  const {
    text,
    title,
    username,
    changeBack,
    textPosition,
    titlePosition,
    code,
    image,
    Save,
    save,
  } = useText();

  formData.append("text", text);
  formData.append("xtext", textPosition === null ? null : textPosition.valueX);
  formData.append(
    "ytext",
    titlePosition === null ? null : titlePosition.valueY
  );
  formData.append("title", title);
  formData.append(
    "xtitle",
    titlePosition === null ? null : titlePosition.valueX
  );
  formData.append(
    "Ytitle",
    titlePosition === null ? null : titlePosition.valueY
  );
  formData.append("twitter", username);
  formData.append("background", changeBack);
  formData.append("code", code);

  // const values = {
  //   title,
  //   xtitle: titlePosition === null ? null : titlePosition.valueX,
  //   ytitle: titlePosition === null ? null : titlePosition.valueY,

  //   background: changeBack,
  //   image,
  //   twitter: username,
  //   code,
  // };

  const [proLanguage, setProLanguage] = useState(null);
  const [topic, setTopic] = useState(null);
  const [subTopic, setSubTopic] = useState(null);
  const [dynamicText, setdynamicText] = useState(null);
  const [languageAdded, setLanguageAdded] = useState("");
  const [topicAdded, setTopicAdded] = useState("");
  const [subtopicAdded, setSubTopicAdded] = useState("");
  const [add, setAdd] = useState(null);
  const { id } = useParams();

  // const imageBlob = toBlob(image);

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
    getProgramingLanguages();
    getLanguageTopicSubTopic();
  }, [add]);

  useEffect(() => {
    if (id) {
      getResource(id);
      getProgramingLanguages();
    }
  }, [id]);

  useEffect(() => {
    if (resource !== null) {
      var lan = resource.language;
      var top = resource.topic;
      getSubTopics({
        query: `${proLanguage ? proLanguage : lan.id}/${
          topic ? topic : top.id
        }/`,
      });
    }
  }, [resource, topic]);

  function handleTextFieldText(event) {
    if (dynamicText === "language") {
      setLanguageAdded(event.target.value);
    }
    if (dynamicText === "topic") {
      setTopicAdded(event.target.value);
    }
    if (dynamicText === "subtopic") {
      setSubTopicAdded(event.target.value);
    }
  }
  function handleSaveEdit(e) {
    const text = e.target.innerText;
    if (typeof proLanguage === "number") {
      if (text === "SAVE") {
        Save();
        if (image !== null) {
          formData.append("image", image, "Mysnippe.png");
        }
        addSnippet(formData, { idLang: proLanguage });
      }
    } else {
      enqueueSnackbar("Select a programing language!", { variant: "error" });
    }
  }
  // function handleDescription(event) {
  //   setDescription(event.target.value);
  // }
  function handleAdd() {
    if (dynamicText === "language") {
      addLanguage({ name: languageAdded });
      setAdd([languageAdded]);
      handleOpen();
    }
    if (dynamicText === "topic") {
      addTopic({ name: topicAdded }, { id: proLanguage });
      setAdd([languageAdded, topicAdded]);
      handleOpen();
    }
    if (dynamicText === "subtopic") {
      addSubTopic(
        { name: subtopicAdded },
        { idLang: proLanguage },
        { idTop: topic }
      );
      setAdd([subtopicAdded]);
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
          // value={languageAdded}
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
                sx={{
                  boxShadow: "0 0 10px #21ebff, 0 0 5px #290066",
                  fontSize: "12px",
                }}
                color={theme.secondary}
              >
                {languages.results.length !== 0 ? (
                  languages.results.map((l) => {
                    return (
                      <MenuItem
                        key={l.id}
                        value={l.id}
                        sx={{ fontSize: "12px" }}
                      >
                        {l.name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem sx={{ fontSize: "12px" }}>
                    No languages yet...
                  </MenuItem>
                )}
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
                disabled={proLanguage ? false : true}
                name="topic"
                variant="outlined"
                sx={{
                  boxShadow: proLanguage
                    ? "0 0 10px #21ebff, 0 0 5px #290066"
                    : null,
                  fontSize: "12px",
                }}
                color={theme.secondary}
                size="small"
              >
                {nested.results.map((n) => {
                  return n.id === proLanguage
                    ? n.topic.map((t) => {
                        return (
                          <MenuItem
                            value={t.id}
                            key={t.id}
                            sx={{ fontSize: "12px" }}
                          >
                            {t.name}
                          </MenuItem>
                        );
                      })
                    : null;
                })}
              </SelectCustomized>
            </FormControl>
            <Tooltip title="Add a new Topic">
              <span>
                <IconButton
                  size="large"
                  color="primary"
                  onClick={() => handleOpen("topic")}
                  disabled={proLanguage ? false : true}
                >
                  <AddBoxIcon />
                </IconButton>
              </span>
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
                disabled={topic ? false : true}
                id="topice"
                value={subTopic ?? ""}
                onChange={handleChange}
                name="subtopic"
                variant="outlined"
                sx={{
                  boxShadow: topic ? "0 0 10px #21ebff, 0 0 5px #290066" : null,
                  fontSize: "12px",
                }}
                color={theme.secondary}
                size="small"
              >
                {subtopics.results.map((sub) => {
                  return (
                    <MenuItem
                      value={sub.id}
                      option={sub.name}
                      key={sub.id}
                      sx={{ fontSize: "12px" }}
                    >
                      {sub.name}
                    </MenuItem>
                  );
                })}
              </SelectCustomized>
            </FormControl>
            <Tooltip title="Add a new Sub-topic">
              <span>
                <IconButton
                  size="large"
                  color="primary"
                  onClick={() => handleOpen("subtopic")}
                  disabled={topic ? false : true}
                >
                  <AddBoxIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          {/* <TextField
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
              fontSize: "8px",
            }}
          /> */}

          <ButtonCustomized
            component={Link}
            variant="contained"
            sx={{ mt: 8, borderRadius: "10px" }}
            to="/create-note"
            onClick={handleSaveEdit}
          >
            {id ? "Edit" : "Save"}
          </ButtonCustomized>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
