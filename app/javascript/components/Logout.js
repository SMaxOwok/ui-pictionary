import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authenticationActions } from 'store/actions';

import withCurrentUser from 'components/hoc/withCurrentUser';

class Logout extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  handleSubmit = () => {
    this.props.dispatch(authenticationActions.logout());
  };

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div className='Logout'>
        <button type='button' className='Button Button--primary' onClick={this.handleSubmit}>
          Logout
        </button>
      </div>
    )
  }
}

export default withCurrentUser(connect(Logout.mapStateToProps)(Logout));
