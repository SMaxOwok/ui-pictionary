const initialState = {};

const setPlayerGuess = (state, action) => {
  if (!action.payload) return state;
  const { playerId, message, isCorrect } = action.payload;

  return { ...state, [playerId]: { word: message, isCorrect } };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GUESS_WORD':
      return setPlayerGuess(state, action);
    default:
      return state;
  }
};
