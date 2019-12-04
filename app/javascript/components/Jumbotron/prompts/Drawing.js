import React, { Component } from 'react';
import PropTypes from 'prop-types';

import roundUtils from 'utils/roundUtils';

export default class Drawing extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    game: PropTypes.object.isRequired
  };

  get currentRound() {
    return this.props.game.currentRound;
  }

  get prompt() {
    if (!roundUtils.isOnTeam(this.currentRound, this.props.currentUser)) return 'Join a team to play';

    if (roundUtils.isArtist(this.currentRound, this.props.currentUser)) return this.currentRound.currentWord;

    if (roundUtils.isOnDrawingTeam(this.currentRound, this.props.currentUser)) return 'Start guessing!';

    return 'Your team is up next round'
  }

  render () {
    return (
      <div className='Jumbotron__direction'>
        {this.prompt}
      </div>
    );
  }
}
