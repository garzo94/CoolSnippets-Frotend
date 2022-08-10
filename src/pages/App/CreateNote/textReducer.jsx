export const initialState = {
  addText: false,
  addTitle: false,
  background: 0,
  query: "all",
  programingLang: "",
  twitterProfile: false,

  text: null,
  title: null,
  username: null,
  titlePosition: null,
  textPosition: null,
  code: null,
  image: null,
  save: false,
};

export default function textReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TEXT":
      return {
        ...state,
        addText: !state.addText,
      };
    case "ADD_TITLE":
      return {
        ...state,
        addTitle: !state.addTitle,
      };
    case "CHANGE_BACKGROUND":
      return {
        ...state,
        background: payload,
      };
    case "CHANGE_QUERY":
      return {
        ...state,
        query: payload,
      };
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        programingLang: payload,
      };
    case "CHANGE_TWITTER":
      return {
        ...state,
        twitterProfile: !state.twitterProfile,
      };

    //#DATA SAVE - EDIT
    case "TEXT":
      return {
        ...state,
        text: payload,
      };
    case "TITLE":
      return {
        ...state,
        title: payload,
      };
    case "USERNAME":
      return {
        ...state,
        username: payload,
      };
    case "TITLE_POSITION":
      return {
        ...state,
        titlePosition: payload,
      };
    case "TEXT_POSITION":
      return {
        ...state,
        textPosition: payload,
      };
    case "CODE":
      return {
        ...state,
        code: payload,
      };

    case "IMAGE":
      return {
        ...state,
        image: payload,
      };

    case "SAVE":
      return {
        ...state,
        save: !state.save,
      };

    default:
      state;
  }
}
