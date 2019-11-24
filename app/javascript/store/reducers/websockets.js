const initialState = {};

const developmentEnv = process.env.NODE_ENV === 'development';

const connect = (state, action) => {
  if (developmentEnv) {
    console.log(action.payload + ' -- connecting...');
  }

  return state;
};

const connected = (state, action) => {
  const payload = action.payload;

  if (developmentEnv) {
    console.log(payload.channel + ' -- connected!');
  }

  const newState = { ...state };
  newState[payload.channel] = payload.subscription;

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECT':
      return connect(state, action);
    case 'CONNECTED':
      return connected(state, action);
    default:
      return state;
  }
};
