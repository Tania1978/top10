import {
  FETCH_USERS,
  UPDATE_USER,
  DELETE_USER,
  REGISTER,
  LOGIN,
  LOG_OUT,
} from "./types";
import users from "../apis/users";

export const fetchUserByEmail = async (email) => {
  let user = {};

  const response = await users.get("/users");
  if (response.data.length > 0) {
    user = response.data.find((user) => user.email === email);
  }
  return user;
};

export const login = (formValues) => {
  return async (dispatch) => {
    try {
      const user = await fetchUserByEmail(formValues.email);
      const response = await users.post("/login", { ...formValues });

      dispatch({
        type: LOGIN,
        payload: {
          email: formValues.email,
          username: user.username,
          id: user.id,
          token: response.data.accessToken,
          isSignedIn: true,
        },
      });
    } catch (err) {
      if (err.response.data === "Cannot find user") {
        dispatch({
          type: "INCORRECT_USERNAME_OR_PASSWORD",
          payload: err.response.data,
        });
      }
    }
  };
};

export const register = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await users.post("/users", {
        email: formValues.email,
        password: formValues.password,
        username: formValues.username,
      });

      dispatch({
        type: REGISTER,
        payload: {
          email: formValues.email,
          username: formValues.username,
          token: null,
          isSignedIn: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOut = () => {
  localStorage.clear();
  return {
    type: LOG_OUT,
  };
};

export const fetchUsers = () => {
  try {
    return async (dispatch) => {
      const response = await users.get("/users");

      dispatch({
        type: FETCH_USERS,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (email, formValues) => {
  return async (dispatch, getState) => {
    //const { userId } = getState().auth;
    const response = await users.patch(`/users/${email}`, formValues);

    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });
    //    history.push("/");
  };
};

export const deleteUser = (email) => {
  return async (dispatch) => {
    await users.delete(`/users/${email}`);

    dispatch({
      type: DELETE_USER,
      payload: email,
    });

    //  history.push("/");
  };
};
