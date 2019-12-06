import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { entityActions, gameActions, websocketActions } from 'store/actions';

import get from 'lodash/get';

class Game extends Component {
  static mapStateToProps = state => (
    { gameChannel: get(state, 'websockets.gameChannel') }
  );

  static propTypes = {
    gameChannel: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  initializeWebsocket() {
    this.props.dispatch(websocketActions.connect('gameChannel'));

    const gameSubscription = App.cable.subscriptions.create(
      { channel: 'GameChannel' },
      {
        received: data => this.handleDataReceived(data),
        transition: data => this.handleTransition(data),
        submitWord: data => this.handleSubmitWord(data),
        guessWord: data => this.handleGuessWord(data),
        skipWord: () => this.handleSkipWord()
      }
    );

    this.props.dispatch(websocketActions.connected(
      {
        channel: 'gameChannel',
        subscription: {
          ...gameSubscription,
          ...gameSubscription.__proto__
        }
      }
    ));
  }

  handleDataReceived = data => {
    switch (data['type']) {
      case 'guess':
        this.props.dispatch(gameActions.guessWord(data));
      default:
        this.props.dispatch(entityActions.setEntity(data));
    }
  };

  handleTransition = data => {
    this.props.gameChannel.perform('transition_game', { status: data });
  };

  handleSubmitWord = data => {
    this.props.gameChannel.perform('submit_word', { word: data });
  };

  handleGuessWord = data => {
    this.props.gameChannel.perform('guess_word', data);
  };

  handleSkipWord = () => {
    this.props.gameChannel.perform('skip_word');
  };

  componentDidMount() {
    this.initializeWebsocket();
  }

  render () {
    return null;
  }
}

export default connect(Game.mapStateToProps)(Game);
