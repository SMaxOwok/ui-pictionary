import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { gameActions } from 'store/actions';

export default class Completed extends Component {
  static propTypes = {
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
          Reset Game
        </button>
      </div>
    );
  }
}
