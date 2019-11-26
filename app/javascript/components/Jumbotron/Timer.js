import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    gameChannel: PropTypes.object.isRequired
  };

  state = { remaining: this.duration };

  get endTime() {
    if (!this.props.game.transitionAt) return null;

    return new Date(Date.parse(this.props.game.transitionAt));
  }

  get duration() {
    if (!this.endTime) return null;
    const now = new Date();

    if (now >= this.endTime) return null;

    return Math.round((this.endTime - now) / 1000);
  }

  get remaining() {
    if (!this.state.remaining) return '00';
    if (this.state.remaining >= 10) return this.state.remaining;

    return `0${this.state.remaining}`
  }

  get isWarningTime() {
    if (this.remaining === 0) return false;

    return this.remaining <= 10 && this.remaining > 5;
  }

  get isDangerTime() {
    if (this.remaining === 0) return false;

    return this.remaining <= 5;
  }

  get countdownClasses() {
    return classnames('Jumbotron__timer__countdown', {
      'Jumbotron__timer__countdown--warning': this.isWarningTime,
      'Jumbotron__timer__countdown--danger': this.isDangerTime
    })
  }

  resetTimer() {
    this.setState({ remaining: this.duration });
  }


  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.remaining <= 0) return null;

      this.setState(state => ({ remaining: state.remaining - 1 }))
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.transitionAt !== this.props.game.transitionAt) {
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render () {
    return (
      <div className='Jumbotron__timer'>
        Timer
        <span className={this.countdownClasses}>
          {this.remaining}
        </span>
      </div>
    );
  }
}
