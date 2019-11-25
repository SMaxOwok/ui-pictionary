import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

import Modal from 'components/Modal';

export default class Leaderboard extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onClose();
  };

  render() {
    return (
      <Modal visible={this.props.visible}>
        <div className='Leaderboard'>
          <div className='Leaderboard__title'>
            <FontAwesomeIcon icon={faTrophy} />
            Leaderboard
          </div>

          <form onSubmit={this.handleSubmit}>

            <button type='submit' className='Leaderboard__button Button Button--primary'>
              Close
            </button>
          </form>
        </div>
      </Modal>
    )
  }
}
