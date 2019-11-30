import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PreDraw extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    game: PropTypes.object.isRequired
  };

  get currentRound() {
    return {};
    // return this.props.game.currentRound;
  }

  get isArtist() {
    if (!this.props.currentUser) return false;

    return this.currentRound.artistId === this.props.currentUser.id;
  }

  get isOnDrawingTeam() {
    if (!this.props.currentUser) return false;

    return this.currentRound.drawTeamId === this.props.currentUser.teamId;
  }

  get isOnTeam() {
    if (!this.props.currentUser) return false;

    return !!this.props.currentUser.teamId;
  }

  get prompt() {
    if (!this.isOnTeam) return 'Join a team to play';

    if (this.isArtist) return 'Get ready to draw';

    if (this.isOnDrawingTeam) return 'Get ready to guess';

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
