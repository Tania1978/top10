import movies from "../apis/movies";
import {
  GET_TOP_MOVIES,
  GET_ALL_APP_MOVIES,
  ADD_VOTE,
  VOTE_MOVIE_ERROR,
  VOTE_MOVIE_SUCCESS,
} from "./types";

export const voteMovieSuccess = (data) => ({
  type: VOTE_MOVIE_SUCCESS,
  payload: data,
});

export const voteMovieError = (error) => ({
  type: VOTE_MOVIE_ERROR,
  payload: error,
});

export const voteMovie = (values) => {
  return async (dispatch) => {
    try {
      const response = await movies.post("/movies", {
        Title: values.data.Title,
        Year: values.data.Year,
        id: values.data.imdbID,
        Poster: values.data.Poster,
        Votes: 1,
      });

      if (response.data.Title) {
        dispatch(voteMovieSuccess(response.data));
      }

      if (response.data.Error) {
        console.log(response.data.Error);
        dispatch(voteMovieError(response.data.Error));
      }
    } catch (error) {
      dispatch(voteMovieError(error));
    }
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const response = await movies.get(`/movies/${id}`);

    if (response.data) {
      const res = await movies.put(`/movies/${id}`, {
        ...response.data,
        Votes: response.data.Votes + 1,
      });

      dispatch({
        type: ADD_VOTE,
        payload: res.data,
      });
    }
  };
};

export const getTopMovies = () => {
  let sortedList = [];
  return async (dispatch) => {
    const response = await movies.get("/movies");
    console.log(response.data);
    if (response.data.length > 0) {
      sortedList = response.data.sort((a, b) =>
        a.Votes < b.Votes
          ? 1
          : a.Votes === b.Votes
          ? a.Title > b.Title
            ? 1
            : -1
          : -1
      );
    }

    console.log(sortedList.length);
    if (sortedList.length > 9) {
      sortedList = sortedList.slice(0, 10);
    }
    dispatch({
      type: GET_TOP_MOVIES,
      payload: sortedList,
    });
  };
};

export const getAllAppMovies = () => {
  return async (dispatch) => {
    const response = await movies.get("/movies");

    dispatch({
      type: GET_ALL_APP_MOVIES,
      payload: response.data,
    });
  };
};
