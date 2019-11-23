import Routes from 'routes';

import { authenticationActions } from 'store/actions';
import { request } from 'store/utilities';

function joinTeam(payload, dispatch) {
  return request(
    Routes.me_path(),
    'PUT',
    { team_id: payload.teamId }
  ).then(payload => dispatch(authenticationActions.setCurrentUser(payload))).catch(() => null);
}

export default function playerMiddleware({ dispatch }) {
  return next => action => {
    const payload = action.payload;

    if (action.type === 'JOIN_TEAM') {
      return joinTeam(payload, dispatch);
    }

    return next(action);
  };
}
