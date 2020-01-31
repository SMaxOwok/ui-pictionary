import Routes from 'routes';

import { leaderboardActions as actions } from 'store/actions';
import { request } from 'store/utilities';

function fetchLeaderboard(dispatch) {
  return request(Routes.leaderboard_path()).then(payload => (
    dispatch(actions.fetchLeaderboardSuccess(payload)))
  );
}

export default function leaderboardMiddleware({ dispatch }) {
  return next => action => {
    if (action.type === 'FETCH_LEADERBOARD') {
      return fetchLeaderboard(dispatch);
    }

    return next(action);
  };
}
