import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

import TokenInput from './TokenInput';

export default class Verification extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = { token: '' };

  handleChange = (token) => {
    this.setState({ token });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(playerActions.verify(
      { token: this.state.token }
    ));
  };

  handleResend = () => {
    this.props.dispatch(playerActions.resendVerification());
  };

  render() {
    return (
      <div className='Verification'>
        <form onSubmit={this.handleSubmit}>
          <label className='FormInput__label'>
            Enter your 6-digit verification code
          </label>

          <TokenInput token={this.state.token} onChange={this.handleChange} />

          <div className='Modal__actions'>
            <button type='submit' className='Modal__button Button Button--primary'>
              Verify
            </button>
          </div>
        </form>

        <div className='Modal__instructional-copy'>
          Didn't get a code?

          <button type='button' className='Verification__resend-button Button Button--link' onClick={this.handleResend}>
            Resend
          </button>
        </div>
      </div>
    );
  }
}

