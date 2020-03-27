const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PALETTE':
      return action.payload;
    default:
      return state;
  }
};
