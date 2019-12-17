import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

import HowToPlay from 'components/HowToPlay';

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

  get totalPlayerCount() {
    return Object.keys(this.props.teams).reduce((a, b) => {
      const current = this.props.teams[a];
      const previous = this.props.teams[b];

      return current.players.length + previous.players.length;
    })
  }

  get readyPlayerCount() {
    return this.props.game.readyPlayerIds.length;
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
        <div className='Initialized__content'>
          <div className='Initialized__ready-players'>
            <div className='Initialized__ready-players__count'>
              {this.readyPlayerCount} / {this.totalPlayerCount}
            </div>
            players ready
          </div>
        </div>

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
