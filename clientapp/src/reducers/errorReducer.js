const errorReducer = (state = null, action) => {
  switch (action.type) {
    case "MOVIE_NOT_FOUND":
      return action.payload;
    case "INCORRECT_USERNAME_OR_PASSWORD":
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
