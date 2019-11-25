import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';

import Modal from 'components/Modal';

export default class Rules extends Component {
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
        <div className='Rules'>
          <div className='Rules__title'>
            <FontAwesomeIcon icon={faBook} />
            Rules
          </div>

          <form onSubmit={this.handleSubmit}>

            <button type='submit' className='Rules__button Button Button--primary'>
              Close
            </button>
          </form>
        </div>
      </Modal>
    )
  }
}
