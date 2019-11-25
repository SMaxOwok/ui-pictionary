import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Round from './Round';
import Timer from './Timer';

import get from 'lodash/get';

class Jumbotron extends Component {
  static mapStateToProps = state => (
    {
      game: get(state, 'entities.game'),
      gameChannel: get(state, 'websockets.gameChannel')
    }
  );

  static propTypes = {
    game: PropTypes.object.isRequired
  };

  get status() {
    switch (this.props.game.currentState) {
      case 'initialized':
        return 'Waiting for game to start...';
      case 'setup':
        return 'Submit words to draw';
      case 'pre_draw':
        return 'Pre-draw';
      case 'drawing':
        return 'Drawing';
      case 'completed':
        return 'Completed';
      default:
        return null;
    }
  }

  render () {
    return (
      <div className='Jumbotron'>
        <Round { ...this.props } />

        <div className='Jumbotron__direction'>
          {this.status}
        </div>

        <Timer { ...this.props } />
      </div>
    );
  }
}

export default connect(Jumbotron.mapStateToProps)(Jumbotron);
