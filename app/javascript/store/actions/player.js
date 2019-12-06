export const joinTeam = (payload) => ({
  type: 'JOIN_TEAM',
  payload
});

export const setName = (payload) => ({
  type: 'SET_NAME',
  payload
});

export default {
  joinTeam,
  setName
}
