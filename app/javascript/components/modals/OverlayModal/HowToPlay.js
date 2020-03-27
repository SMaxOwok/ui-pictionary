import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import HowToPlay from 'components/HowToPlay';

export default class HowToPlayModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onClose();
  };

  render() {
    return (
      <Fragment>
        <HowToPlay />

        <form onSubmit={this.handleSubmit}>
          <div className='Modal__actions'>
            <button type='submit' className='Modal__button Button Button--primary'>
              Close
            </button>
          </div>
        </form>
      </Fragment>
    )
  }
}
