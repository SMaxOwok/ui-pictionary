import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import HowToPlay from 'components/HowToPlay';

export default class HowToPlayModal extends Component {
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
        <div className='HowToPlayModal'>
          <HowToPlay />

          <form onSubmit={this.handleSubmit}>
            <button type='submit' className='HowToPlayModal__button Button Button--primary'>
              Close
            </button>
          </form>
        </div>
      </Modal>
    )
  }
}
