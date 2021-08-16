import top10 from "../apis/top10";

const getTodayDate = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return date;
};

export const fetchCurrentTop10OfUser = (userId) => {
  const date = getTodayDate();
  return async (dispatch) => {
    const response = await top10.get(`/top10/?user=${userId}&date=${date}`);
    dispatch({
      type: "GET_CURRENT_TOP10",
      payload: response.data[0],
    });
  };
};

export const getTop10s = () => {
  return async (dispatch) => {
    const response = await top10.get("/top10");

    dispatch({
      type: "GET_TOP10S",
      payload: response.data,
    });
  };
};

//get call to see if top10 for date exists for the user

export const createTop10OfDay = (user) => {
  const date = getTodayDate();
  return async (dispatch) => {
    const response = await top10.get(`/top10/?user=${user}&date=${date}`);
    if (response.data.length === 0) {
      const res = await top10.post("/top10/", {
        date: date,
        user: user,
        movies: [],
        votes: 0,
      });

      dispatch({
        type: "CREATE_TOP10_FOR_USER",
        payload: res.data,
      });
      dispatch({
        type: "GET_CURRENT_TOP10",
        payload: res.data,
      });
    } else {
      console.log(response.data);
      dispatch({
        type: "GET_CURRENT_TOP10",
        payload: response.data[0],
      });
    }
  };
};

export const addVoteToTop10 = (user, movie) => {
  const date = getTodayDate();
  try {
    return async (dispatch) => {
      const response = await top10.get(`/top10/?user=${user}&date=${date}`);
      if (Object.keys(response.data).length !== 0) {
        const top10OfUser = response.data[0];
        console.log(top10OfUser);
        const res = await top10.put(`/top10/${top10OfUser.id}`, {
          date: top10OfUser.date,
          user: top10OfUser.user,
          votes: top10OfUser.votes + 1,
          movies: [...top10OfUser.movies, movie.data.Title],
        });

        dispatch({
          type: "ADD_VOTE_TO_TOP10",
          payload: res.data,
        });
        dispatch({
          type: "GET_CURRENT_TOP10",
          payload: res.data,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
