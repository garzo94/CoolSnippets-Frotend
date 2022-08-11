import { createContext, useReducer, useContext } from "react";
import textReducer, { initialState } from "./textReducer";

const Context = createContext(initialState);

import React from "react";

export function Provider({ children }) {
  const [state, dispatch] = useReducer(textReducer, initialState);

  const addTextFunc = () => {
    dispatch({
      type: "ADD_TEXT",
    });
  };

  const addTitleFunc = () => {
    dispatch({
      type: "ADD_TITLE",
    });
  };

  const changeBackground = (value) => {
    dispatch({
      type: "CHANGE_BACKGROUND",
      payload: value,
    });
  };

  const changeQuery = (value) => {
    dispatch({
      type: "CHANGE_QUERY",
      payload: value,
    });
  };

  const changeLanguage = (value) => {
    dispatch({
      type: "CHANGE_LANGUAGE",
      payload: value,
    });
  };

  const changeBoolTwitter = () => {
    dispatch({
      type: "CHANGE_TWITTER",
    });
  };

  const Twitter = (value) => {
    dispatch({
      type: "USERNAME",
      payload: value,
    });
  };

  const Text = (value) => {
    dispatch({
      type: "TEXT",
      payload: value,
    });
  };

  const TitlePositionFunc = (value) => {
    console.log(value);
    dispatch({
      type: "TITLE_POSITION",
      payload: value,
    });
  };

  const TextPositionFunc = (value) => {
    dispatch({
      type: "TEXT_POSITION",
      payload: value,
    });
  };

  const Title = (value) => {
    dispatch({
      type: "TITLE",
      payload: value,
    });
  };

  const Code = (value) => {
    dispatch({
      type: "CODE",
      payload: value,
    });
  };

  const ImageFunc = (value) => {
    dispatch({
      type: "IMAGE",
      payload: value,
    });
  };

  const Save = () => {
    dispatch({
      type: "SAVE",
    });
  };

  const ProLanguage = (values) => {
    dispatch({
      type: "PRO_LANGUAGE",
      payload: values,
    });
  };

  const QuerySnippet = (values) => {
    dispatch({
      type: "QUERY_SNIPPET",
      payload: values,
    });
  };

  const value = {
    addText: state.addText,
    addTitle: state.addTitle,
    changeBack: state.background,
    query: state.query,
    programingLang: state.programingLang,
    twitterProfile: state.twitterProfile,
    changeLanguage,
    addTitleFunc,
    addTextFunc,
    changeBackground,
    changeQuery,
    changeBoolTwitter,
    QuerySnippet,
    querySnippet: state.querySnippet,
    username: state.username,
    text: state.text,
    title: state.title,
    textPosition: state.textPosition,
    titlePosition: state.titlePosition,
    code: state.code,
    image: state.image,
    save: state.save,
    prolanguage: state.prolanguage,
    ProLanguage,
    Save,
    ImageFunc,
    Code,
    TextPositionFunc,
    TitlePositionFunc,
    Twitter,
    Text,
    Title,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useText = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useText must be used within ShopContext");
  }

  return context;
};

export default useText;
