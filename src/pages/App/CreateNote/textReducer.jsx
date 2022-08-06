export const initialState = {
  addText: false,
  addTitle: false,
  background: 0,
  query: "all",
  programingLang: "",
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
    default:
      state;
  }
}
