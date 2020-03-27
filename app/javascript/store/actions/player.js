export const joinTeam = (payload) => ({
  type: 'JOIN_TEAM',
  payload
});

export const updatePlayer = (payload) => ({
  type: 'UPDATE_PLAYER',
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
  updatePlayer,
  setReady,
  setUnready,
  verify,
  resendVerification
}
