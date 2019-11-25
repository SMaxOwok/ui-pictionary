import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    gameChannel: PropTypes.object.isRequired
  };

  render () {
    return (
      <div className='Jumbotron__timer'>
        Timer
        <span className='Jumbotron__timer__number'></span>
      </div>
    );
  }
}
