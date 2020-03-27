import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

export default class NameEntry extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = { name: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(playerActions.updatePlayer(
      { name: this.state.name }
    ));
  };

  render() {
    if (!this.props.currentUser) return null;

    return (
      <Fragment>
        <div className='Modal__title'>
          New player, who dis?
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className='FormInput'>
            <label className='FormInput__label'>
              Your name
            </label>

            <input type='text' value={this.state.name} onChange={this.handleChange} />
          </div>

          <div className='Modal__actions'>
            <button type='submit' className='Modal__button Button Button--primary'>
              Continue
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
