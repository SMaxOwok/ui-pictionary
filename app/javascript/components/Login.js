import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Routes from 'routes';

import Modal from './Modal';
import Loading from './Loading';

const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export default class Login extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    onSuccess: PropTypes.func.isRequired
  };

  state = { email: '', loading: false };

  async login() {
    await fetch(
      Routes.sessions_path({ email: this.state.email }),
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf } }
    ).then(response => (
      response.json()
    )).then(currentUser => {
      this.setState({ email: '' });
      this.props.onSuccess(currentUser);
    }).catch(() => {});
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ email: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true }, async () => (
      this.login()
    ).finally(() => this.setState({ loading: false })));
  };

  render() {
    return (
      <Modal visible={!this.props.currentUser}>
        <Loading visible={this.state.loading} />

        <div className='Login'>
          <div className='Login__title'>
            Login to play
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className='FormInput'>
              <label>Email</label>
              <input type='text' value={this.state.email} onChange={this.handleChange} />
            </div>

            <div className='Login__actions'>
              <button type='submit' className='Button Button--primary'>
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}
