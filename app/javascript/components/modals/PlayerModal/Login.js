import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authenticationActions } from 'store/actions';

export default class Login extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = { email: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ email: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(authenticationActions.login(
      { email: this.state.email }
    ));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='FormInput'>
          <label className='FormInput__label'>
            Sign in using your email address
          </label>

          <input type='text' placeholder='example@email.com' value={this.state.email} onChange={this.handleChange} />

          <div className='FormInput__instructional-copy'>
            Your email is used for tracking your stats on the leaderboard
          </div>
        </div>

        <div className='Modal__actions'>
          <button type='submit' className='Modal__button Button Button--primary'>
            Sign in
          </button>
        </div>
      </form>
    );
  }
}
