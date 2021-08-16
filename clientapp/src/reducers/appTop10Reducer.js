const appTop10Reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_TOP10S":
      return action.payload;
    case "CREATE_TOP10_FOR_USER":
      return [...state, action.payload];
    case "ADD_VOTE_TO_TOP10":
      const newState = [...state];
      newState.map((top10) => {
        if (action.payload.id === top10.id) {
          top10.votes = action.payload.votes;
          top10.movies = action.payload.movies;
        }
      });
      return newState;
    default:
      return state;
  }
};

export default appTop10Reducer;
