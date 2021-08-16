import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import imdbReducer from "./imdbReducer";
import movieReducer from "./movieReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import appMoviesReducer from "./appMoviesReducer";
import appTop10Reducer from "./appTop10Reducer";
import top10AppMoviesReducer from "./top10AppMoviesReducer";
import userTop10Reducer from "./userTop10Reducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  imdbMovies: imdbReducer,
  form: formReducer,
  selectedMovie: movieReducer,
  users: userReducer,
  loggedInUser: authReducer,
  movies: appMoviesReducer,
  top10AppMovies: top10AppMoviesReducer,
  allUserTop10: appTop10Reducer,
  currentTopListOfUser: userTop10Reducer,
  error: errorReducer,
});
