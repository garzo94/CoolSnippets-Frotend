import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DownloadIcon from "@mui/icons-material/Download";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectCustomizedLanguage } from "../../../styles/createTheme";
import { theme } from "../../../styles/createTheme";
import "../../../styles/style.css";
import Draggable from "react-draggable";
import useText from "./Context";
import { dataBackground } from "./backgroundData";
import exportAsImage from "./exportAsImage";
import useRequestResource from "../../hooks/useRequestResource";
import { useNavigate, useParams } from "react-router-dom";
import TwitterComponent from "./Twitter.jsx";
import domtoimage from "dom-to-image";

export default function Main() {
  const exportRef = useRef();
  const { id } = useParams();
  const { resource, getResource } = useRequestResource({});
  const [textChange, setTextChange] = useState("Write your text here!");
  const [titleChange, setTitleChange] = useState("Write your title here!");
  const [twitterChange, setTwitterChange] = useState("@username");

  const {
    addText,
    addTitle,
    addTextFunc,
    addTitleFunc,
    changeBackground,
    twitterProfile,
    Twitter,
    Text,
    Title,
    TextPositionFunc,
    TitlePositionFunc,
    Code,
    ImageFunc,
    save,
    code,
    changeBack,
    prolanguage,
    changeBoolTwitter,
    edit,
  } = useText();

  useEffect(() => {
    if (id) {
      getResource(id);
    }
  }, [id]);

  const textRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const [Titleposition, setTitleposition] = useState({
    valueX: -200,
    valueY: -140,
  });

  const [Textposition, setTextposition] = useState({
    valueX: -250,
    valueY: -100,
  });

  const eventLoggerTitle = (e, data) => {
    TitlePositionFunc({
      valueX: data.x.toFixed(2),
      valueY: data.y.toFixed(2),
    });
  };
  const eventLoggerText = (e, data) => {
    TextPositionFunc({
      valueX: data.x.toFixed(2),
      valueY: data.y.toFixed(2),
    });
  };

  const [click, setClick] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  var toBlob = require("canvas-to-blob");

  useEffect(() => {
    domtoimage.toPng(document.getElementById("domEl")).then(function (dataUrl) {
      ImageFunc(toBlob(dataUrl));
    });
  }, [save, edit, prolanguage, changeBack]);

  useEffect(() => {
    Text(textChange);
    if (addText === true) {
      TextPositionFunc(Textposition);
    }
  }, [addText]);

  useEffect(() => {
    if (addTitle === true) {
      TitlePositionFunc(Titleposition);
    }
  }, [addTitle]);

  useEffect(() => {
    Title(textChange);
  }, [titleChange]);

  useEffect(() => {
    Twitter(twitterChange);
  }, [twitterProfile]);

  useEffect(() => {
    if (resource) {
      if (resource.text !== "") {
        addTextFunc();
      }
      if (resource.title !== "") {
        addTitleFunc();
      }
      if (resource.background) {
        changeBackground(resource.background);
      }
      if (resource.language) {
        var mylanguage = resource.language;
        setSelectValue(mylanguage.name);
      }
      if (resource.text) {
        setTextChange(resource.text);
        setTextposition({ valueX: resource.xtext, valueY: resource.ytext });
      }
      if (resource.title) {
        setTitleChange(resource.title);
        setTitleposition({
          valueX: resource.xtitle,
          valueY: resource.ytitle,
        });
      }
      if (resource.twitter) {
        setTwitterChange(resource.twitter);
        changeBoolTwitter();
      }
      if (resource.code) {
        Code(resource.code === null ? "" : resource.code);
      }
    }
  }, [resource]);

  function handleKey(e) {
    if (String(e.target.className).includes("title") && e.key === "Delete") {
      addTitleFunc();
    }
    if (String(e.target.className).includes("text") && e.key === "Delete") {
      addTextFunc();
    }
  }
  function handleChangeTitle(e) {
    Title(e.target.textContent);
  }

  function handleChangeText(e) {
    Text(e.target.textContent);
  }

  function handleTwitter(e) {
    Twitter(e.target.textContent);
  }
  function handleClick() {
    setClick(true);
  }
  function handleClickAway() {
    setClick(false);
  }
  function handleSelect(e) {
    setSelectValue(e.target.value);
  }

  return (
    <div>
      <Box>
        <FormControl
          sx={{
            width: "220px",
            ml: 5,
            borderRadius: "10px",
            bgcolor: "rgba(25,51,77,0.2)",
          }}
        >
          <InputLabel
            id="demo-simple-select-label"
            color="secondary"
            sx={{ color: theme.palette.secondary.main }}
          >
            Code Editor
          </InputLabel>
          <SelectCustomizedLanguage
            labelId="language"
            id="planguage"
            label="Language"
            value={selectValue ?? ""}
            defaultValue="choose"
            onChange={handleSelect}
            variant="standard"
            color="secondary"
            size="normal"
            sx={{
              borderRadius: "15px",
              color: "#19334d",
              pl: 2,
            }}
          >
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Javascript">Javascript</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="SQL">SQL</MenuItem>
          </SelectCustomizedLanguage>
        </FormControl>

        <Box
          sx={{
            width: "auto",
            height: "100%",
            background: dataBackground[changeBack],
            maxWidth: "800px",
            borderRadius: "25px",
            display: "flex",
            justifyContent: "center",
            transition: "all 0.2s",
            position: "relative",
            alignItems: "center",
          }}
          ref={exportRef}
          id="domEl"
        >
          {addText ? (
            <Draggable
              defaultPosition={{
                x: parseInt(Textposition.valueX),
                y: parseInt(Textposition.valueY),
              }}
              bounds="parent"
              onStop={eventLoggerText}
              nodeRef={textRef}
            >
              <div
                ref={textRef}
                suppressContentEditableWarning={true}
                contentEditable="true"
                onInput={(e) => handleChangeText(e)}
                onKeyDown={(e) => handleKey(e)}
                className="text"
                style={{ cursor: "grab", color: "#fff", position: "absolute" }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontSize: "1rem",
                  }}
                >
                  {textChange}
                </Typography>
              </div>
            </Draggable>
          ) : null}

          {addTitle ? (
            <Draggable
              defaultPosition={{
                x: parseInt(Titleposition.valueX),
                y: parseInt(Titleposition.valueY),
              }}
              bounds="parent"
              onStop={eventLoggerTitle}
              nodeRef={titleRef}
            >
              <div
                contentEditable="true"
                ref={titleRef}
                suppressContentEditableWarning={true}
                onInput={(e) => handleChangeTitle(e)}
                onKeyDown={(e) => handleKey(e)}
                className="title"
                style={{
                  cursor: "grab",
                  color: "#fff",
                  position: "absolute",
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontSize: "1.5rem",
                  }}
                >
                  {titleChange}
                </Typography>
              </div>
            </Draggable>
          ) : null}

          {twitterProfile ? (
            <TwitterComponent username={twitterChange} handle={handleTwitter} />
          ) : null}

          <ClickAwayListener onClickAway={handleClickAway}>
            <CodeEditor
              value={code}
              language={selectValue ?? ""}
              placeholder="Paste your code here!"
              onChange={(evn) => Code(evn.target.value)}
              padding={25}
              minHeight={200}
              onClick={handleClick}
              className={click ? "grabber" : null}
              style={{
                fontSize: 15,
                backgroundColor: "141B1F ",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                borderRadius: "15px",
                maxWidth: "88%",
                minWidth: "250px",
                minHeight: "200px",
                maxHeight: "100%",
                resize: "both",
                resize: click ? "both" : "none",
                margin: 100,
                boxShadow: changeBack === 17 ? "0px 0px 5px #fff" : null,
              }}
            />
          </ClickAwayListener>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        sx={{
          color: theme.palette.primary.main,
          ml: 85,
          mt: 1,
          borderRadius: "10px",
        }}
        startIcon={<DownloadIcon />}
        onClick={() => exportAsImage(exportRef.current, "mySnniped")}
      >
        Download
      </Button>
    </div>
  );
}
