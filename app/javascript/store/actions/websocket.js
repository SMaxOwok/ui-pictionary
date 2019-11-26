export const connect = (payload) => ({
  type: 'WEBSOCKET_CONNECT',
  payload
});

export const connected = (payload) => ({
  type: 'WEBSOCKET_CONNECTED',
  payload
});

export const disconnect = (payload) => ({
  type: 'WEBSOCKET_DISCONNECT',
  payload
});

export default {
  connect,
  connected,
  disconnect
}
