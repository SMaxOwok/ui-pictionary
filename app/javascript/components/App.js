import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'store';

import { authenticationActions } from '../store/actions';

import GameContainer from 'components/GameContainer';

export default class App extends Component {
  componentDidMount() {
    if (this.props.currentUser) {
      store.dispatch(authenticationActions.setCurrentUser(this.props.currentUser));
    }
  }

  render () {
    return (
      <Provider store={store}>
        <GameContainer />
      </Provider>
    );
  }
}
