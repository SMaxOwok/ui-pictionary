import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Confetti from 'react-dom-confetti';

export default class Guess extends PureComponent {
  static propTypes = {
    guess: PropTypes.shape({
      word: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool.isRequired
    })
  };

  state = { confetti: false };

  get guessClasses() {
    return classnames('Player__guess', {
      'Player__guess--correct': this.isCorrect,
    });
  }

  get guessedWord() {
    if (!this.props.guess) return null;

    return this.props.guess.word;
  }

  get isCorrect() {
    if (!this.props.guess) return false;

    return this.props.guess.isCorrect;
  }

  // This is pretty gnarly, but the confetti component triggers by state change.  It'd be
  // nice to use something else in the future to not have so much logic and state
  // changing here.
  componentDidUpdate(prevProps) {
    if (prevProps.guess) {
      if (prevProps.guess.word !== this.props.guess.word) {
        if (this.isCorrect) {
          this.setState({ confetti: false}, () => this.setState({ confetti: true }));
        } else {
          this.setState({ confetti: false });
        }
      }
    } else {
      if (this.props.guess) {
        if (this.isCorrect) {
          this.setState({ confetti: true});
        } else {
          this.setState(({ confetti: false }));
        }
      }
    }
  }

  render () {
    if (!this.guessedWord) return null;

    return (
      <span key={this.guessedWord} className={this.guessClasses}>
        <span className='Player__guess__confetti'>
          <Confetti
            active={this.state.confetti}
            config={{
              duration: 4000,
              elementCount: 25,
              spread: 45,
              startVelocity: 20
            }}
          />
        </span>

        {this.guessedWord}
      </span>
    );
  }
}
