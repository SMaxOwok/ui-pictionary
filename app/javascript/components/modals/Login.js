import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authenticationActions } from 'store/actions';

import withCurrentUser from 'components/hoc/withCurrentUser';

import Modal from 'components/Modal';

class Login extends Component {
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
    )).then(() => this.setState({ email: '' }));
  };

  render() {
    return (
      <Modal visible={!this.props.currentUser}>
        <div className='Login'>
          <div className='Login__header'>
            Sign in using your email address
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className='FormInput'>
              <input type='text' placeholder="example@email.com" value={this.state.email} onChange={this.handleChange} />
              <div className='FormInput__instructional-copy'>
                Your email is used for tracking your stats on the leaderboard
              </div>
            </div>

            <button type='submit' className='Login__button Button Button--primary'>
              Sign in
            </button>
          </form>
        </div>
      </Modal>
    )
  }
}

export default withCurrentUser(connect(Login.mapStateToProps)(Login));
