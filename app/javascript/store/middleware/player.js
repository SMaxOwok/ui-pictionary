import Routes from 'routes';

import { themeActions } from 'store/actions';
import { request } from 'store/utilities';

function joinTeam(payload, state, dispatch) {
  return request(
    Routes.me_path(),
    'PUT',
    { team_id: payload.teamId }
  ).then(() => {
    const team = get(state, `entities.team.${payload.teamId}`);

    dispatch(themeActions.setPalette(team.palette))
  }).catch(() => null);
}

export default function playerMiddleware({ getState, dispatch }) {
  return next => action => {
    const state = getState();
    const payload = action.payload;

    if (action.type === 'JOIN_TEAM') {
      return joinTeam(payload, state, dispatch);
    }

    return next(action);
  };
}
