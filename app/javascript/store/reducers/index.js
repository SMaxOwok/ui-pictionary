import { combineReducers } from 'redux';
import authentication from './authentication';
import entities from './entities';
import websockets from './websockets';

const reducers = combineReducers({
  authentication,
  entities,
  websockets
});

export default reducers;
