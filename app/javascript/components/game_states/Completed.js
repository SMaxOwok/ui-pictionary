import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { gameActions } from 'store/actions';

export default class Completed extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleResetGame = () => {
    this.props.gameChannel.transition('initialized');
  };

  componentDidMount() {
    this.props.dispatch(gameActions.flushGuesses());
  }

  render () {
    return (
      <div className='Completed'>

        <button
          type='button'
          className='Completed__button Button Button--primary'
          onClick={this.handleResetGame}
        >
          Start a new game
        </button>
      </div>
    );
  }
}
