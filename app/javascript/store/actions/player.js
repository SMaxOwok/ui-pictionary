export const joinTeam = (payload) => ({
  type: 'JOIN_TEAM',
  payload
});

export const setName = (payload) => ({
  type: 'SET_NAME',
  payload
});

export const setReady = () => ({
  type: 'SET_PLAYER_READY'
});

export const setUnready = () => ({
  type: 'SET_PLAYER_UNREADY'
});

export const verify = (payload) => ({
  type: 'VERIFY',
  payload
});

export const resendVerification = () => ({
  type: 'RESEND_VERIFICATION'
});

export default {
  joinTeam,
  setName,
  setReady,
  setUnready,
  verify,
  resendVerification
}
