import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Easels from 'components/easels';

import roundUtils from 'utils/roundUtils';

export default class Drawing extends Component {
  static propTypes = {
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

  render () {
    return (
      <div className='Drawing'>
        <this.Component />
      </div>
    );
  }
}
