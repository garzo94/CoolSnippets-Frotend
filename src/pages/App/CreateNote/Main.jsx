import React, { useState, useRef } from "react";
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

export default function Main() {
  const exportRef = useRef();
  // const domEl = useRef(null);
  // const downloadImage = async () => {
  //   const dataUrl = await htmlToImage.toPng(domEl.current);

  //   // download image
  //   const link = document.createElement("a");
  //   link.download = "MySnipped.png";
  //   link.href = dataUrl;
  //   link.click();
  // };
  const [background, setBackground] = useState(0);
  const { addText, addTitle, addTextFunc, addTitleFunc, changeBack } =
    useText();
  const nodeRef = React.useRef(null);
  const [position, setposition] = useState({
    valueX: -250,
    valueY: -140,
  });

  const eventLogger = (e, data) => {
    setposition({ valueX: data.x, valueY: data.y });
  };
  const [code, setCode] = useState(null);
  const [click, setClick] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  function handleKey(e) {
    console.log(e.target.className);
    if (String(e.target.className).includes("title") && e.key === "Delete") {
      addTitleFunc();
    }
    if (String(e.target.className).includes("text") && e.key === "Delete") {
      addTextFunc();
    }
  }
  function handleChangeText(e) {
    // console.log(e.currentTarget.textContent);
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
            width: "200px",
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
            Language
          </InputLabel>
          <SelectCustomizedLanguage
            labelId="language"
            id="planguage"
            label="Language"
            value={selectValue ?? ""}
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
              defaultPosition={{ x: position.valueX, y: position.valueY }}
              bounds="parent"
              onStop={eventLogger}
              nodeRef={nodeRef}
            >
              <div
                contentEditable="true"
                ref={nodeRef}
                suppressContentEditableWarning={true}
                onInput={handleChangeText}
                onKeyDown={(e) => handleKey(e)}
                className="text"
                style={{ cursor: "grab", color: "#fff", position: "absolute" }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Edu TAS Beginner', cursive;",
                    fontSize: "1.5rem",
                  }}
                >
                  Write your text here!
                </Typography>
              </div>
            </Draggable>
          ) : null}

          {addTitle ? (
            <Draggable
              defaultPosition={{ x: position.valueX, y: position.valueY }}
              bounds="parent"
              onStop={eventLogger}
              nodeRef={nodeRef}
            >
              <h3
                contentEditable="true"
                ref={nodeRef}
                suppressContentEditableWarning={true}
                onInput={handleChangeText}
                onKeyDown={(e) => handleKey(e)}
                className="title"
                style={{
                  cursor: "grab",
                  color: "#fff",
                  position: "absolute",
                  m: 20,
                  fontFamily: '"Edu NSW ACT Foundation", cursive',
                  fontSize: "2rem",
                }}
              >
                Write your title here!
              </h3>
            </Draggable>
          ) : null}
          <ClickAwayListener onClickAway={handleClickAway}>
            <CodeEditor
              value={code}
              language={selectValue ?? ""}
              placeholder="Paste your code here!"
              onChange={(evn) => setCode(evn.target.value)}
              padding={35}
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
        onClick={() => exportAsImage(exportRef.current, "test")}
      >
        Download
      </Button>
    </div>
  );
}
