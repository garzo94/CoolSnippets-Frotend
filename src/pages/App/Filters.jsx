import React, { useState, useEffect, useRef } from "react";
import { FormControl, Box, InputLabel, MenuItem } from "@mui/material";

import PropTypes from "prop-types";
import { SelectCustomized } from "../../styles/createTheme";
import { theme } from "../../styles/createTheme";
import useRequestResource from "../hooks/useRequestResource";
import useText from "./CreateNote/Context";

export default function Filters() {
  const languageRef = useRef();
  const { changeQuery, changeLanguage } = useText();
  const {
    getProgramingLanguages,
    getLanguageTopicSubTopic,
    getSubTopics,
    languages,
    nested,
    subtopics,
  } = useRequestResource({});
  const [programingLanguage, setProgramingLanguage] = useState(null);
  const [topic, setTopic] = useState(null);
  const [subTopic, setSubTopic] = useState(null);

  useEffect(() => {
    getProgramingLanguages();
    getLanguageTopicSubTopic();
  }, []);

  function handleMenuItem(language) {
    changeLanguage(language);
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case "language":
        setProgramingLanguage(event.target.value);
        changeQuery(event.target.value);

        break;
      case "topic":
        setTopic(event.target.value);
        changeQuery(`${programingLanguage}/${event.target.value}/`);
        getSubTopics({ query: `${programingLanguage}/${event.target.value}/` });
        break;
      case "subTopic":
        setSubTopic(event.target.value);
        changeQuery(`${programingLanguage}/${topic}/${event.target.value}/`);
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: {
          xl: "end",
          lg: "end",
          md: "end",
          sm: "center",
          xs: "center",
        },
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <FormControl
        sx={{
          minWidth: 250,
          marginRight: 2,
          marginBottom: 2,
          borderRadius: "20px",
        }}
        variant="outlined"
      >
        <InputLabel
          sx={{ color: theme.palette.primary.main }}
          id="programingLanguage-label"
        >
          Programing Language
        </InputLabel>
        <SelectCustomized
          labelId="category-label"
          disabled={false}
          label="Programing Language"
          id="filter-language"
          size="large"
          value={programingLanguage ?? ""}
          onChange={handleChange}
          name="language"
          variant="outlined"
          sx={{ boxShadow: "0 0 10px #21ebff, 0 0 7px #290066" }}
          color={theme.secondary}
        >
          {languages.results.length !== 0 ? (
            languages.results.map((l) => {
              return (
                <MenuItem key={l.id} value={l.id} sx={{ fontSize: "12px" }}>
                  {l.name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem sx={{ fontSize: "12px" }}>No languages yet!</MenuItem>
          )}
        </SelectCustomized>
      </FormControl>

      <FormControl
        sx={{
          width: 250,
          marginRight: 2,
          marginBottom: 2,
        }}
      >
        <InputLabel sx={{ color: theme.palette.primary.main }} id="topic-label">
          Topic
        </InputLabel>
        <SelectCustomized
          labelId="topic-label"
          label="Topic"
          id="filter-language"
          size="large"
          value={topic ?? ""}
          onChange={handleChange}
          disabled={programingLanguage === null ? true : false}
          variant="outlined"
          sx={{
            boxShadow:
              programingLanguage !== null
                ? "0 0 10px #21ebff, 0 0 7px #290066"
                : null,
          }}
          name="topic"
          color={theme.primary}
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

      <FormControl
        sx={{
          width: 250,
          marginRight: 2,
          marginBottom: 2,
        }}
      >
        <InputLabel
          sx={{ color: theme.palette.primary.main }}
          id="subTopic-label"
        >
          SubTopic
        </InputLabel>
        <SelectCustomized
          labelId="topic-label"
          label="Sub Topic"
          id="filter-subtopic"
          size="large"
          value={subTopic ?? ""}
          onChange={handleChange}
          disabled={topic === null ? true : false}
          variant="outlined"
          sx={{
            boxShadow:
              topic !== null ? "0 0 10px #21ebff, 0 0 7px #290066" : null,
          }}
          name="subTopic"
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
    </Box>
  );
}

Filters.propTypes = {
  onSubmit: PropTypes.func,
};
