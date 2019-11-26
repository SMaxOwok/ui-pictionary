import get from 'lodash/get';

function disconnect(channelName, state) {
  const channel = get(state, `websockets.${channelName}`);
  if (!channel) return null;

  return channel.disconnect();
}

export default function playerMiddleware({ getState }) {
  return next => action => {
    const state = getState();
    const payload = action.payload;

    if (action.type === 'WEBSOCKET_DISCONNECT') {
      return disconnect(payload.channel, state);
    }

    return next(action);
  };
}
