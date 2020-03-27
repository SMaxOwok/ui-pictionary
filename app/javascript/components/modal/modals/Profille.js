import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { authenticationActions, playerActions, modalActions } from 'store/actions';

export default class Profile extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = {
    name: this.props.currentUser.name,
    email: this.props.currentUser.email
  };

  get canSubmit() {
    return Object.entries(this.state).every(([_key, value]) =>  !!value);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.canSubmit) return null;

    this.props.dispatch(playerActions.updatePlayer(this.state));
  };

  handleClose = () => {
    this.props.dispatch(modalActions.closeModal());
  };

  handleSignOut = () => {
    this.props.dispatch(authenticationActions.logout());
    this.props.dispatch(modalActions.closeModal());
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className='Modal__title'>
            Profile
          </div>

          <div className='FormInput'>
            <label className='FormInput__label'>
              Your name
            </label>

            <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
          </div>

          <div className='FormInput'>
            <label className='FormInput__label'>
              Your email
            </label>

            <input disabled type='text' name='email' value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className='Modal__actions'>
            <button type='submit' className='Modal__button Button Button--primary'>
              Update profile
            </button>

            <button type='button' className='Modal__button Button Button--secondary' onClick={this.handleClose}>
              Close
            </button>
          </div>
        </form>

        <button type='button' className='Modal__button Modal__button--external Button Button--danger' onClick={this.handleSignOut}>
          Sign out
        </button>
      </Fragment>
    );
  }
}
