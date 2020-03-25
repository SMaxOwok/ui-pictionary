import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

import withCurrentUser from 'components/hoc/withCurrentUser';

import Modal from 'components/Modal';

class NameEntry extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = { name: '' };

  get visible() {
    if (!this.props.currentUser) return false;
    if (!this.props.currentUser.emailVerified) return false;

    return !this.props.currentUser.name;
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(playerActions.setName(
      { name: this.state.name }
    )).then(() => this.setState({ name: '' }));
  };

  render() {
    if (!this.props.currentUser) return null;

    return (
      <Modal visible={this.visible}>
        <div className='NameEntry'>
          <div className='NameEntry__title'>
            New player, who dis?
          </div>

          <div className='NameEntry__label'>
            Your name
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className='FormInput'>
              <input type='text' value={this.state.name} onChange={this.handleChange} />
            </div>

            <button type='submit' className='NameEntry__button Button Button--primary'>
              Continue
            </button>
          </form>
        </div>
      </Modal>
    )
  }
}

export default withCurrentUser(connect(NameEntry.mapStateToProps)(NameEntry));
