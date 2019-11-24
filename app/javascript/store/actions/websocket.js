export const connect = (payload) => ({
  type: 'CONNECT',
  payload
});

export const connected = (payload) => ({
  type: 'CONNECTED',
  payload
});


export default {
  connect,
  connected
}
