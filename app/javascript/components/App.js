import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from 'store';

import { authenticationActions, entityActions } from 'store/actions';

import GameContainer from 'components/GameContainer';

export default class App extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    teams: PropTypes.array
  };

  componentDidMount() {
    if (this.props.currentUser) {
      store.dispatch(authenticationActions.setCurrentUser(this.props.currentUser));
    }

    if (this.props.game) {
      store.dispatch(entityActions.setEntity(this.props.game));
    }

    if (this.props.teams) {
      store.dispatch(entityActions.setEntities(this.props.teams));
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
