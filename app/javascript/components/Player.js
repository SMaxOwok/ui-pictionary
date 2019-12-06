import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import get from 'lodash/get';

class Player extends React.Component {
  static mapStateToProps = (state, ownProps) => (
    {
      guess: get(state, `guesses.${ownProps.player.id}`),
      team: get(state, `entities.team.${ownProps.player.teamId}`),
    }
  );

  static propTypes = {
    player: PropTypes.object.isRequired
  };

  get player() {
    return this.props.player;
  }

  get guessClasses() {
    return classnames('Player__guess', {
      'Player__guess--correct': this.props.guess && this.props.guess.isCorrect,
    });
  }

  get guessedWord() {
    if (!this.props.guess) return null;

    return this.props.guess.word;
  }

  render () {
    if (!this.player) return null;

    return (
      <li className='Player'>
        {this.player.name}

        {this.guessedWord && (
          <span key={this.guessedWord} className={this.guessClasses}>
            {this.guessedWord}
          </span>
        )}
      </li>
    );
  }
}

export default connect(Player.mapStateToProps)(Player);
