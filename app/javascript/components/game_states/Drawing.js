import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Easels from 'components/easels';

import roundUtils from 'utils/roundUtils';

export default class Drawing extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
  };

  get currentRound() {
    return this.props.game.currentRound;
  }

  get Component() {
    if (!roundUtils.isOnTeam(this.currentRound, this.props.currentUser)) {
      return Easels.Spectator;
    }

    if (roundUtils.isArtist(this.currentRound, this.props.currentUser)) {
      return Easels.Artist;
    }

    if (roundUtils.isOnDrawingTeam(this.currentRound, this.props.currentUser)) {
      return Easels.Guesser;
    }

    return Easels.Spectator;
  }

  // TODO: Remove when we take the button out
  handleTransition = () => {
    this.props.gameChannel.transition('pre_draw');
  };

  render () {
    return (
      <div className='Drawing'>
        <button
          type='button'
          className='Button Button--primary'
          onClick={this.handleTransition}
        >
          Next state
        </button>
        <this.Component />
      </div>
    );
  }
}
