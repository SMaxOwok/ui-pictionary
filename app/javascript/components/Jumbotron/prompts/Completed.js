import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Completed extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    teams: PropTypes.object.isRequired
  };

  get winnerId() {
    return this.props.game.winnerId;
  }

  get winningTeam() {
    return this.props.teams[this.winnerId];
  }

  get prompt() {
    if (!this.winningTeam) return 'It\'s a tie!';

    return `${this.winningTeam.name} win!`;
  }

  render () {
    return (
      <div className='Jumbotron__direction'>
        {this.prompt}
      </div>
    );
  }
}
