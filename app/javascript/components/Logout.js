import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Routes from 'routes';

import Modal from './Modal';
import Loading from './Loading';

const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export default class Logout extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    onSuccess: PropTypes.func.isRequired
  };

  state = { loading: false };

  async logout() {
    await fetch(
      Routes.sessions_path(),
      { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf } }
    ).then(response => (
      response.json()
    )).then(() => (
      this.props.onSuccess(null)
    )).catch(() => {});
  }

  handleSubmit = () => {
    this.setState({ loading: true }, async () => this.logout().finally(() => this.setState({ loading: false })));
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
