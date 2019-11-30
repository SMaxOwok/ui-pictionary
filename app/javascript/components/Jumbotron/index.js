import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Prompts from './prompts';
import Round from './Round';
import Timer from './Timer';

import humps from 'humps';
import get from 'lodash/get';

import withCurrentUser from 'components/hoc/withCurrentUser';

class Jumbotron extends Component {
  static mapStateToProps = state => (
    {
      gameChannel: get(state, 'websockets.gameChannel'),
      teams: get(state, 'entities.team')
    }
  );

  static propTypes = {
    currentUser: PropTypes.object,
    game: PropTypes.object.isRequired,
    gameChannel: PropTypes.object.isRequired,
    teams: PropTypes.object.isRequired
  };

  get PromptComponent() {
    return Prompts[humps.pascalize(this.props.game.currentState)];
  }

  render () {
    return (
      <div className='Jumbotron'>
        <Round { ...this.props } />

        <this.PromptComponent { ...this.props } />

        <Timer { ...this.props } />
      </div>
    );
  }
}

export default withCurrentUser(connect(Jumbotron.mapStateToProps)(Jumbotron));
