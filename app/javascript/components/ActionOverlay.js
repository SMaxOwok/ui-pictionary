import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authenticationActions } from 'store/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faSignOutAlt, faBook } from '@fortawesome/free-solid-svg-icons';
import Icons from 'components/icons';

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
        <div className='ActionOverlay ActionOverlay--logo'>
          <Icons.UILogo /> UI Pictionary
        </div>

        <div className='ActionOverlay ActionOverlay--leaderboard'>
          <button type='button' className='Button Button--icon' onClick={this.handleShowLeaderboard}>
            <FontAwesomeIcon icon={faTrophy} />
            Leaderboard
          </button>
        </div>

        <div className='ActionOverlay ActionOverlay--rules'>
          <button type='button' className='Button Button--icon' onClick={this.handleShowRules}>
            <FontAwesomeIcon icon={faBook} />
            Rules
          </button>
        </div>

        {this.props.currentUser && (
          <div className='ActionOverlay ActionOverlay--sign-out'>
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
