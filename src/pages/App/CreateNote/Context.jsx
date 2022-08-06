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

  const value = {
    addText: state.addText,
    addTitle: state.addTitle,
    changeBack: state.background,
    query: state.query,
    programingLang: state.programingLang,
    changeLanguage,
    addTitleFunc,
    addTextFunc,
    changeBackground,
    changeQuery,
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
