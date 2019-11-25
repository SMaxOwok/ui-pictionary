import Routes from 'routes';

import { authenticationActions as actions, themeActions } from 'store/actions';
import { request } from 'store/utilities';

import get from 'lodash/get';

function authenticate(email, dispatch) {
  return request(
    Routes.sessions_path(),
    'POST',
    { email }
  ).then(payload => dispatch(actions.setCurrentUser(payload))).catch(() => null);
}

function destroySession(dispatch) {
  return request(
    Routes.sessions_path(),
    'DELETE',
    null
  ).then(() => dispatch(actions.setCurrentUser(null))).catch(() => null);
}

function updateUIFromUser(currentUser, state, dispatch) {
  if (!currentUser) {
    return dispatch(themeActions.setPalette(null));
  }

  const teams = get(state, 'entities.team');

  if (currentUser.teamId) {
    dispatch(themeActions.setPalette(teams[currentUser.teamId].palette));
  }
}

export default function authenticationMiddleware({ getState, dispatch }) {
  return next => action => {
    const state = getState();
    const payload = action.payload;

    if (action.type === 'SET_CURRENT_USER') {
      updateUIFromUser(payload, state, dispatch);
    }

    if (action.type === 'LOGIN') {
      return authenticate(payload.email, dispatch);
    }

    if (action.type === 'LOGOUT') {
      return destroySession(dispatch);
    }

    return next(action);
  };
}
