import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Completed extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    teams: PropTypes.object
  };

  handleResetGame = () => {
    this.props.gameChannel.transition('initialized');
  };

  render () {
    return (
      <div className='Completed'>

        <button
          type='button'
          className='Completed__button Button Button--primary'
          onClick={this.handleResetGame}
        >
          Reset Game
        </button>
      </div>
    );
  }
}
