import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import get from 'lodash/get';

import roundUtils from 'utils/roundUtils';

class Player extends React.Component {
  static mapStateToProps = (state, ownProps) => (
    {
      game: get(state, 'entities.game'),
      guess: get(state, `guesses.${ownProps.player.id}`),
      team: get(state, `entities.team.${ownProps.player.teamId}`),
    }
  );

  static propTypes = {
    game: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    guess: PropTypes.object
  };

  get player() {
    return this.props.player;
  }

  get currentRound() {
    return this.props.game.currentRound;
  }

  get isArtist() {
    return roundUtils.isArtist(this.currentRound, this.player);
  }

  get guessClasses() {
    return classnames('Player__guess', {
      'Player__guess--correct': this.props.guess && this.props.guess.isCorrect,
    });
  }

  get playerClasses() {
    return classnames('Player', {
      'Player--artist': this.isArtist
    });
  }

  get guessedWord() {
    if (!this.props.guess) return null;

    return this.props.guess.word;
  }

  render () {
    if (!this.player) return null;

    return (
      <li className={this.playerClasses}>
        {this.player.name}

        {this.isArtist && (
          <FontAwesomeIcon icon={faEdit} />
        )}

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
