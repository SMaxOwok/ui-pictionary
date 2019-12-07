import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HowToPlay from 'components/HowToPlay';

export default class Initialized extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    teams: PropTypes.object
  };

  static defaultProps = {
    teams: {}
  };

  handleStartGame = () => {
    this.props.gameChannel.transition('setup');
  };

  render () {
    return (
      <div className='Initialized'>
        <HowToPlay />

        <button
          type='button'
          className='Initialized__button Button Button--primary'
          onClick={this.handleStartGame}
        >
          Start the game
        </button>
      </div>
    );
  }
}
