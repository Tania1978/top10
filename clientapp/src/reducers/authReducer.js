import { REGISTER, LOGIN, LOG_OUT } from "../actions/types";

const initialState = {
  id: 0,
  email: null,
  username: null,
  token: null,
  isSignedIn: null,
  top10: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return action.payload;
    case LOGIN:
      return action.payload;
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
