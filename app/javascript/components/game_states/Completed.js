import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { gameActions, modalActions } from 'store/actions';

export default class Completed extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    gameChannel: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleResetGame = () => {
    this.props.gameChannel.transition('initialized');
  };

  handleOpenGallery = () => {
    this.props.dispatch(modalActions.openModal('gallery'));
  };

  componentDidMount() {
    this.props.dispatch(gameActions.flushGuesses());
  }

  render () {
    return (
      <div className='Completed'>
        <button
          type='button'
          className='Completed__button Button Button--secondary'
          onClick={this.handleOpenGallery}
        >
          Gallery
        </button>

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
