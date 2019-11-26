import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from 'store';

import GameContainer from 'components/GameContainer';
import Websockets from 'components/websockets';

import { authenticationActions, entityActions } from 'store/actions';

export default class App extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    teams: PropTypes.array.isRequired
  };

  componentDidMount() {
    if (this.props.game) {
      store.dispatch(entityActions.setEntity(this.props.game));
    }

    if (this.props.teams) {
      store.dispatch(entityActions.setEntities(this.props.teams));
    }

    if (this.props.currentUser) {
      store.dispatch(authenticationActions.setCurrentUser(this.props.currentUser));
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Websockets.Me />
        <Websockets.Drawing />
        <Websockets.Game />
        {this.props.teams.map(team => (
          <Websockets.Team key={team.id} id={team.id} />
        ))}

        <GameContainer />
      </Provider>
    );
  }
}
