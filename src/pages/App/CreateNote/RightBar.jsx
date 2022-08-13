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
    updateResource,
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
    ProLanguage,
    prolanguage,
    querySnippet,
    QuerySnippet,

    Edit,
  } = useText();

  formData.append("text", text);
  formData.append("title", title);
  formData.append("twitter", username);
  formData.append("background", changeBack);
  formData.append("code", code);

  const [topic, setTopic] = useState(null);
  const [subTopic, setSubTopic] = useState(null);
  const [dynamicText, setdynamicText] = useState(null);
  const [languageAdded, setLanguageAdded] = useState("");
  const [topicAdded, setTopicAdded] = useState("");
  const [subtopicAdded, setSubTopicAdded] = useState("");
  const [add, setAdd] = useState(null);
  const { id } = useParams();

  function handleChange(event) {
    switch (event.target.name) {
      case "language":
        setTopic(null);
        ProLanguage(event.target.value);
        QuerySnippet(`${event.target.value}`);

        break;
      case "topic":
        setTopic(event.target.value);
        QuerySnippet(`${prolanguage}/${event.target.value}`);

        break;
      case "subtopic":
        QuerySnippet(`${prolanguage}/${topic}/${event.target.value}`);
        setSubTopic(event.target.value);
        break;
    }
  }

  useEffect(() => {
    getProgramingLanguages();
    getLanguageTopicSubTopic();
    if (prolanguage !== null && topic !== null) {
      getSubTopics({
        query: `${prolanguage}/${topic}/`,
      });
    }
  }, [add]);

  useEffect(() => {
    if (prolanguage !== null && topic !== null) {
      getSubTopics({
        query: `${prolanguage}/${topic}/`,
      });
    }
  }, [topic]);

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
      top
        ? getSubTopics({
            query: `${prolanguage ? prolanguage : lan.id}/${
              topic ? topic : top.id
            }/`,
          })
        : null;
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
    if (typeof prolanguage === "number") {
      if (image !== null) {
        formData.append("image", image, "Mysnippe.png");
      }
      if (textPosition !== null) {
        formData.append("xtext", parseInt(textPosition.valueX));
        formData.append("ytext", parseInt(textPosition.valueY));
      }
      if (titlePosition !== null) {
        formData.append("xtitle", titlePosition.valueX);
        formData.append("ytitle", titlePosition.valueY);
      }
      if (text === "SAVE") {
        Save();
        addSnippet(formData, querySnippet);
      }
      if (text === "EDIT") {
        Edit();
        updateResource(id, formData, querySnippet);
      }
    } else {
      enqueueSnackbar("Select a programing language!", { variant: "error" });
    }
  }

  function handleAdd() {
    if (dynamicText === "language") {
      addLanguage({ name: languageAdded });
      setAdd(languageAdded);
      handleOpen();
    }
    if (dynamicText === "topic") {
      addTopic({ name: topicAdded }, { id: prolanguage });
      setAdd([topicAdded]);
      handleOpen();
    }
    if (dynamicText === "subtopic") {
      addSubTopic(
        { name: subtopicAdded },
        { idLang: prolanguage },
        { idTop: topic }
      );
      setAdd(subtopicAdded);
      handleOpen();
    }
  }

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
                value={prolanguage ?? ""}
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
                  <MenuItem key={"15sf"} sx={{ fontSize: "12px" }}>
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
                disabled={prolanguage ? false : true}
                name="topic"
                variant="outlined"
                sx={{
                  boxShadow: prolanguage
                    ? "0 0 10px #21ebff, 0 0 5px #290066"
                    : null,
                  fontSize: "12px",
                }}
                color={theme.secondary}
                size="small"
              >
                {nested.results.map((n) => {
                  return n.id === prolanguage ? (
                    n.topic.length === 0 ? (
                      <MenuItem sx={{ fontSize: "12px" }}>
                        No topics yet...
                      </MenuItem>
                    ) : (
                      n.topic.map((t) => {
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
                    )
                  ) : null;
                })}
              </SelectCustomized>
            </FormControl>
            <Tooltip title="Add a new Topic">
              <span>
                <IconButton
                  size="large"
                  color="primary"
                  onClick={() => handleOpen("topic")}
                  disabled={prolanguage ? false : true}
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
                {subtopics.results.length !== 0 ? (
                  subtopics.results.map((sub) => {
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
                  })
                ) : (
                  <MenuItem sx={{ fontSize: "12px" }}>
                    No subtopics yet...
                  </MenuItem>
                )}
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

          <ButtonCustomized
            variant="contained"
            sx={{ mt: 15, borderRadius: "10px" }}
            onClick={handleSaveEdit}
          >
            {id ? "Edit" : "Save"}
          </ButtonCustomized>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
