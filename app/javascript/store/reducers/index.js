import { combineReducers } from 'redux';
import authentication from './authentication';
import entities from './entities';
import theme from './theme';
import websockets from './websockets';

const reducers = combineReducers({
  authentication,
  entities,
  theme,
  websockets
});

export default reducers;
