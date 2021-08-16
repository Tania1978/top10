const imdbReducer = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_SUCCESS":
      return action.payload;
      default:
      return state;
  }
};
export default imdbReducer;
