const initialState = {
  currentUser: null,
};

const setCurrentUser = (state, action) => {
  if (!action.payload) return initialState;

  const newState = {
    currentUser: action.payload
  };

  return Object.assign({}, state, newState);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return setCurrentUser(state, action);
    default:
      return state;
  }
}
