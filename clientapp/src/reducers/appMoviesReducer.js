import {
  VOTE_MOVIE_SUCCESS,
  VOTE_MOVIE_ERROR,
  ADD_VOTE,
  GET_ALL_APP_MOVIES,
} from "../actions/types";

const appMoviesReducer = (movies = [], action) => {
  switch (action.type) {
    case GET_ALL_APP_MOVIES:
      return action.payload;
    case VOTE_MOVIE_SUCCESS:
      return [...movies, action.payload];
    case VOTE_MOVIE_ERROR:
      return movies;
    case ADD_VOTE:
      const newState = [...movies];
      newState.map((movie) => {
        if (action.payload.id === movie.id) {
          movie.Votes = action.payload.Votes;
        }
      });
      return newState;
    default:
      return movies;
  }
};

export default appMoviesReducer;
