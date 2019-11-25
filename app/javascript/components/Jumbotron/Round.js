import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Round extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    gameChannel: PropTypes.object.isRequired
  };

  get round() {
    return this.props.game.roundCount;
  }

  render () {
    return (
      <div className='Jumbotron__round'>
        Round
        <span className='Jumbotron__round__number'>{this.round}</span>
      </div>
    );
  }
}
