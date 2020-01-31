const initialState = {
  guessers: [],
  drawers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LEADERBOARD_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
