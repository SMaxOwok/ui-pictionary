import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import GameStates from 'components/game_states';

import get from 'lodash/get';
import humps from 'humps';

import withCurrentUser from 'components/hoc/withCurrentUser';

class GameState extends Component {
  static mapStateToProps = state => (
    {
      gameChannel: get(state, 'websockets.gameChannel'),
      teams: get(state, 'entities.team'),
      theme: state.theme
    }
  );

  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    game: PropTypes.object.isRequired,
    teams: PropTypes.object,
    theme: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  get componentKey() {
    return humps.pascalize(this.props.game.currentState);
  }

  get Component() {
    return GameStates[this.componentKey];
  }

  get containerClasses() {
    return classnames('GameState', {
      [`GameState--${this.props.theme}`]: !!this.props.theme
    })
  }

  render () {
    return (
      <div className={this.containerClasses}>
        <this.Component { ...this.props }/>
      </div>
    );
  }
}

export default withCurrentUser(connect(GameState.mapStateToProps)(GameState));
