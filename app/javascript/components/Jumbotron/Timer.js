import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Timer extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    gameChannel: PropTypes.object.isRequired
  };

  // TODO: Just a stub so this doesn't explode while I revisit it.
  static defaultProps = {
    remainingTime: 0
  };

  get isWarningTime() {
    if (this.props.remainingTime === 0) return false;

    return this.props.remainingTime <= 10 && this.props.remainingTime > 5;
  }

  get isDangerTime() {
    if (this.props.remainingTime === 0) return false;

    return this.props.remainingTime <= 5;
  }

  get countdownClasses() {
    return classnames('Jumbotron__timer__countdown', {
      'Jumbotron__timer__countdown--warning': this.isWarningTime,
      'Jumbotron__timer__countdown--danger': this.isDangerTime
    })
  }

  get remainingTime() {
    if (this.props.remainingTime >= 10) return this.props.remainingTime;

    return `0${this.props.remainingTime}`
  }

  render () {
    return (
      <div className='Jumbotron__timer'>
        Timer
        <span className={this.countdownClasses}>
          :{this.remainingTime}
        </span>
      </div>
    );
  }
}
