const userTop10Reducer = (state = null, action) => {
  switch (action.type) {
    case "GET_CURRENT_TOP10":
      return action.payload;
    default:
      return state;
  }
};

export default userTop10Reducer;
