import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

export default class Initialized extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    teams: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    teams: {}
  };

  get isReady() {
    if (!this.props.currentUser) return false;
    const { readyPlayerIds } = this.props.game;

    return readyPlayerIds.includes(this.props.currentUser.id);
  }

  get buttonText() {
    if (this.isReady) return 'Wait, I\'m not ready...';

    return 'I\'m ready!';
  }

  handleReady = () => {
    this.props.dispatch(playerActions.setReady());
  };

  handleUnready = () => {
    this.props.dispatch(playerActions.setUnready());
  };

  handleClick = () => {
    if (this.isReady) return this.handleUnready();

    return this.handleReady();
  };

  render () {
    return (
      <div className='Initialized'>
        <button
          type='button'
          className='Initialized__button Button Button--primary'
          onClick={this.handleClick}
        >
          {this.buttonText}
        </button>
      </div>
    );
  }
}
