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
  ).then(() => {
    dispatch(actions.setCurrentUser(null));
  }).catch(() => null);
}

function setCurrentUser(user, state, dispatch) {
  const teamId = get(user, 'teamId');

  if (teamId) {
    const team = get(state, `entities.team.${teamId}`);

    dispatch(themeActions.setPalette(team.palette));
  } else {
    dispatch(themeActions.setPalette(null));
  }
}

export default function authenticationMiddleware({ getState, dispatch }) {
  return next => action => {
    const payload = action.payload;

    if (action.type === 'LOGIN') {
      return authenticate(payload.email, dispatch);
    }

    if (action.type === 'LOGOUT') {
      return destroySession(dispatch);
    }

    if (action.type === 'SET_CURRENT_USER') {
      setCurrentUser(payload, getState(), dispatch);
    }

    return next(action);
  };
}
