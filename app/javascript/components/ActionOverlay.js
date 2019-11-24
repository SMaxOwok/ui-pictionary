import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authenticationActions } from 'store/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faSignOutAlt, faBook } from '@fortawesome/free-solid-svg-icons';
import Icon from 'components/icons/Icon';

import withCurrentUser from 'components/hoc/withCurrentUser';

class ActionOverlay extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  handleSignOut = () => {
    this.props.dispatch(authenticationActions.logout());
  };

  handleShowLeaderboard = () => {

  };

  handleShowRules = () => {

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
            Rules
          </button>
        </div>

        {this.props.currentUser && (
          <div className='ActionOverlay ActionOverlay__sign-out'>
            <button type='button' className='Button Button--icon' onClick={this.handleSignOut}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign out
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withCurrentUser(connect(ActionOverlay.mapStateToProps)(ActionOverlay));
