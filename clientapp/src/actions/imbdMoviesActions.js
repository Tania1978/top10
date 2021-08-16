import imdb from "../apis/imdb";

// export const searchMoviesSuccess = (data) => ({
//   type: "SEARCH_MOVIES_SUCCESS",
//   payload: data,
// });

export const searchMoviesError = (error) => ({
  type: "SEARCH_MOVIES_ERROR",
  payload: error,
});

// export const searchMovies = (keyword, page) => (dispatch) => {
//   return new Promise((resolve, reject) => {
//     imdb
//       .get("", {
//         params: {
//           page: page.toString(),
//           s: keyword,
//         },
//       })
//       .then((response) => {
//         console.log("HELLO");
//         if (response.Search) {
//           dispatch(searchMoviesSuccess(response.Search));
//           resolve();
//         }
//         if (response.data.Error) {
//           console.log(response.data.Error);
//           dispatch(searchMoviesError(response.data.Error));
//           reject();
//         }
//       });
//   });
// };

export const searchMovies = (keyword, page) => {
  try {
    return async (dispatch) => {
      const response = await imdb.get("", {
        params: {
          page: page.toString(),
          s: keyword,
        },
      });
      console.log(response);
      if (response.data.Error) {
        dispatch({
          type: "MOVIE_NOT_FOUND",
          payload: response.data.Error,
        });
      }

      if (response.data.Search) {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: response.data.Search,
        });
      }
    };
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieSuccess = (data) => ({
  type: "FETCH_MOVIE_SUCCESS",
  payload: data,
});

export const fetchMovieError = (error) => ({
  type: "FETCH_MOVIE_ERROR",
  payload: error,
});

export const fetchMovie = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    imdb
      .get("", {
        params: {
          i: id,
          plot: "full",
        },
      })
      .then((response) => {
        if (response.data.Title) {
          dispatch(fetchMovieSuccess(response.data));
          resolve();
        }
        if (response.data.Error) {
          console.log(response.data.Error);
          dispatch(fetchMovieError(response.data.Error));
          reject();
        }
      });
  });
};
