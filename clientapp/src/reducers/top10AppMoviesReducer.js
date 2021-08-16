import { GET_TOP_MOVIES } from "../actions/types";

const top10AppMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TOP_MOVIES:
      return action.payload;
    default:
      return state;
  }
};

export default top10AppMoviesReducer;
