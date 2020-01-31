import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import promiseMiddleware from 'redux-promise';
import authenticationMiddleware from './middleware/authentication';
import playerMiddleware from './middleware/player';
import leaderboardMiddleware from './middleware/leaderboard';

const initialState = {};
const enhancers = [];
const middleware = [
  authenticationMiddleware,
  playerMiddleware,
  leaderboardMiddleware,
  thunk,
  promiseMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(reducers, initialState, composedEnhancers);

export default store;
