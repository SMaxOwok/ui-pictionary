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
    dispatch(themeActions.setPalette(null));
    dispatch(actions.setCurrentUser(null));
  }).catch(() => null);
}

export default function authenticationMiddleware({ dispatch }) {
  return next => action => {
    const payload = action.payload;

    if (action.type === 'LOGIN') {
      return authenticate(payload.email, dispatch);
    }

    if (action.type === 'LOGOUT') {
      return destroySession(dispatch);
    }

    return next(action);
  };
}
