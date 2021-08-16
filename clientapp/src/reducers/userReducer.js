import {
  FETCH_USERS,
  UPDATE_USER,
  DELETE_USER,
  LOGIN
} from "../actions/types";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
      case LOGIN:
    case UPDATE_USER:
      return state.map((user) =>
        user.email === action.payload.email ? action.payload : user
      );
    case DELETE_USER:
      return state.filter((user) => user.email !== action.payload.email);
    default:
      return state;
  }
};

export default userReducer;
