import { combineReducers } from 'redux';
import authentication from './authentication';
import entities from './entities';
import guesses from './guesses';
import leaderboard from './leaderboard';
import theme from './theme';
import websockets from './websockets';

const reducers = combineReducers({
  authentication,
  guesses,
  entities,
  leaderboard,
  theme,
  websockets
});

export default reducers;
