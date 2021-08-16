const initialState = {
  error: null,
  data: null,
};

const movieReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case "FETCH_MOVIE_SUCCESS":
      newState = {
        data: action.payload,
        error: null,
      };
      return newState;
    case "FETCH_MOVIE_ERROR":
      newState = {
        data: null,
        error: action.payload,
      };
      return newState;
    default:
      return state;
  }
};

export default movieReducer;
