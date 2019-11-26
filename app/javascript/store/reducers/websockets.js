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

const disconnect = (state, action) => {
  const payload = action.payload;

  if (developmentEnv) {
    console.log(payload + ' -- disconnected.');
  }

  const newState = { ...state };
  delete newState[payload];

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'WEBSOCKET_CONNECT':
      return connect(state, action);
    case 'WEBSOCKET_CONNECTED':
      return connected(state, action);
    case 'WEBSOCKET_DISCONNECT':
      return disconnect(state, action);
    default:
      return state;
  }
};
