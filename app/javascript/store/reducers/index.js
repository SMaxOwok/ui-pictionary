import { combineReducers } from 'redux';
import authentication from './authentication';
import entities from './entities';
import guesses from './guesses';
import theme from './theme';
import websockets from './websockets';

const reducers = combineReducers({
  authentication,
  guesses,
  entities,
  theme,
  websockets
});

export default reducers;
