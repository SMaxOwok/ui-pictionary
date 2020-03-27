import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import HowToPlay from './HowToPlay';
import Leaderboard from './Leaderboard';

export default class OverlayModal extends Component {
  static propTypes = {
    modal: PropTypes.string,
    onClose: PropTypes.func.isRequired
  };

  get visible() {
    return !!this.BodyComponent;
  }

  get BodyComponent() {
    switch (this.props.modal) {
      case 'howToPlay':
        return <HowToPlay {...this.props} />;
      case 'leaderboard':
        return <Leaderboard {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <Modal visible={this.visible}>
        {this.BodyComponent}
      </Modal>
    )
  }
}
