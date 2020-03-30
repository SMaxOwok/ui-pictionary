import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { gameActions } from 'store/actions';

import Word from 'components/Word';

export default class Completed extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    gameChannel: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  get guessedWords() {
    return this.props.game.guessedWords;
  }

  handleResetGame = () => {
    this.props.gameChannel.transition('initialized');
  };

  componentDidMount() {
    this.props.dispatch(gameActions.flushGuesses());
  }

  render () {
    return (
      <div className='Completed'>
        <div className='Completed__guessed-words'>
          <div className='Completed__label'>
            Words guessed this game
          </div>

          <ul className='Completed__word-list'>
            {this.guessedWords.map(word => (
              <Word key={word} word={word} />
            ))}
          </ul>
        </div>

        <button
          type='button'
          className='Completed__button Button Button--primary'
          onClick={this.handleResetGame}
        >
          Start a new game
        </button>
      </div>
    );
  }
}
