const initialState = { palette: null };

const setPalette = (state, action) => {
  if (!action.payload) return initialState;

  return { ...state, palette: action.payload };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PALETTE':
      return setPalette(state, action);
    default:
      return state;
  }
};
