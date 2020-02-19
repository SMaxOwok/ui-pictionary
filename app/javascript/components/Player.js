import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUserCheck, faUserTimes } from '@fortawesome/free-solid-svg-icons';

import Guess from 'components/Guess';

import get from 'lodash/get';
import roundUtils from 'utils/roundUtils';

class Player extends Component {
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

  get isInitialized() {
    return this.props.game.currentState === 'initialized';
  }

  get isReady() {
    const { readyPlayerIds } = this.props.game;

    return readyPlayerIds.includes(this.player.id);
  }

  get isArtist() {
    return roundUtils.isArtist(this.currentRound, this.player);
  }

  get playerClasses() {
    return classnames('Player', {
      'Player--artist': this.isArtist
    });
  }

  get icon() {
    if (this.isInitialized) {
      if (this.isReady) {
        return <FontAwesomeIcon icon={faUserCheck} />;
      } else {
        return <FontAwesomeIcon icon={faUserTimes} />;
      }
    } else {
      if (this.isArtist) {
        return <FontAwesomeIcon icon={faEdit} />;
      }
    }
  }

  render () {
    if (!this.player) return null;

    return (
      <li className={this.playerClasses}>
        {this.player.name}

        {this.icon}

        <Guess
          guess={this.props.guess}
        />
      </li>
    );
  }
}

export default connect(Player.mapStateToProps)(Player);
