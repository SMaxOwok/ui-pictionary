import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { gameActions } from 'store/actions';

import Word from 'components/Word';

export default class PreDraw extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    teams: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleTransition = () => {
    this.props.gameChannel.transition('drawing');
  };

  get drawingTeam() {
    const drawTeamId = this.props.game.previousRound.team;

    return this.props.teams[drawTeamId];
  }

  get theme() {
    if (!this.drawingTeam) return null;

    return this.drawingTeam.palette;
  }

  get roundCount() {
    return this.props.game.roundCount;
  }

  get guessedWords() {
    return this.props.game.previousRound.guessedWords;
  }

  componentDidMount() {
    this.props.dispatch(gameActions.flushGuesses());
  }

  render () {
    if (this.roundCount === 1) return (
      <button
        type='button'
        className='Button Button--primary'
        onClick={this.handleTransition}
      >
        Next state
      </button>
    );

    return (
      <div className={`PreDraw PreDraw--${this.theme}`}>
        <div className='PreDraw__round'>
          {`Round ${this.roundCount - 1} complete`}
        </div>

        <div className='PreDraw__words'>
          <div className='PreDraw__words__header'>
            Words guessed correctly
          </div>

          <ul className='PreDraw__words__list'>
            {this.guessedWords.map(word => (
              <Word key={word} word={word} />
            ))}
          </ul>
        </div>

        <button
          type='button'
          className='Button Button--primary'
          onClick={this.handleTransition}
        >
          Next state
        </button>
      </div>
    );
  }
}
