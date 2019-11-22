export const login = payload => ({
  type: 'LOGIN',
  payload
});

export const logout = payload => ({
  type: 'LOGOUT',
  payload
});

export const setCurrentUser = payload => ({
  type: 'SET_CURRENT_USER',
  payload
});

export default {
  login,
  logout,
  setCurrentUser
}
