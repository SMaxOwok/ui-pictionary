import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { modalActions } from 'store/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import Icon from 'components/icons/Icon';

import withCurrentUser from 'components/hoc/withCurrentUser';

import get from 'lodash/get';

class ActionOverlay extends Component {
  static mapStateToProps = state => (
    {
      game: get(state, 'entities.game'),
      gameChannel: get(state, 'websockets.gameChannel')
    }
  );

  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = { modal: null };

  get canExitGame() {
    const { currentState } = this.props.game;

    return !['initialized', 'completed'].includes(currentState);
  }

  handleShowModal(key) {
    this.props.dispatch(modalActions.openModal(key));
  }

  handleShowLeaderboard = () => {
    this.handleShowModal('leaderboard');
  };

  handleShowRules = () => {
    this.handleShowModal('howToPlay');
  };

  handleShowProfile = () => {
    this.handleShowModal('profile');
  };

  handleEndGame = () => {
    this.props.gameChannel.transition('completed');
  };

  render () {
    return (
      <Fragment>
        <div className='ActionOverlay ActionOverlay__logo'>
          <Icon name='UILogo' className='ActionOverlay__logo__icon' /> UI Pictionary
        </div>

        <div className='ActionOverlay ActionOverlay__leaderboard'>
          <button type='button' className='Button Button--icon' onClick={this.handleShowLeaderboard}>
            <FontAwesomeIcon icon={faTrophy} />
            Leaderboard
          </button>
        </div>

        <div className='ActionOverlay ActionOverlay__rules'>
          <button type='button' className='Button Button--icon' onClick={this.handleShowRules}>
            <FontAwesomeIcon icon={faBook} />
            How to play
          </button>
        </div>

        {this.canExitGame && (
          <div className='ActionOverlay ActionOverlay__end-game'>
            <button type='button' className='Button Button--icon' onClick={this.handleEndGame}>
              <FontAwesomeIcon icon={faTimesCircle} />
              End game
            </button>
          </div>
        )}

        {this.props.currentUser && (
          <div className='ActionOverlay ActionOverlay__sign-out'>
            <button type='button' className='Button Button--icon' onClick={this.handleShowProfile}>
              <FontAwesomeIcon icon={faUser} />
              Profile
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withCurrentUser(connect(ActionOverlay.mapStateToProps)(ActionOverlay));
