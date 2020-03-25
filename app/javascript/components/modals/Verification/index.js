import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

import withCurrentUser from 'components/hoc/withCurrentUser';

import Modal from 'components/Modal';
import TokenInput from './TokenInput';

class Verification extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = { token: '' };

  get visible() {
    return this.props.currentUser && !this.props.currentUser.emailVerified;
  }

  handleChange = (token) => {
    this.setState({ token });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(playerActions.verify(
      { token: this.state.token }
    )).then(() => this.setState({ token: '' }));
  };

  handleResend = () => {
    this.props.dispatch(playerActions.resendVerification());
  };

  render() {
    return (
      <Modal visible={this.visible}>
        <div className='Verification'>
          <div className='Verification__header'>
            Enter your 6-digit verification code
          </div>

          <form onSubmit={this.handleSubmit}>
            <TokenInput token={this.state.token} onChange={this.handleChange} />

            <button type='submit' className='Verification__button Button Button--primary'>
              Verify
            </button>
          </form>

          <div className='Verification__resend'>
            Didn't get a code?

            <button type="button" className='Verification__button Button Button--link' onClick={this.handleResend}>
              Resend
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default withCurrentUser(connect(Verification.mapStateToProps)(Verification));

