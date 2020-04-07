import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { entityActions, websocketActions } from 'store/actions';

import get from 'lodash/get';

class Drawing extends React.Component {
  static mapStateToProps = state => (
    { drawingChannel: get(state, 'websockets.drawingChannel') }
  );

  static propTypes = {
    drawingChannel: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  initializeWebsocket() {
    this.props.dispatch(websocketActions.connect('drawingChannel'));

    const drawingSubscription = App.cable.subscriptions.create(
      { channel: 'DrawingChannel' },
      {
        received: data => this.handleDataReceived(data),
        draw: data => this.handleDraw(data),
        save: data => this.handleSave(data)
      }
    );

    this.props.dispatch(websocketActions.connected(
      {
        channel: 'drawingChannel',
        subscription: {
          ...drawingSubscription,
          ...drawingSubscription.__proto__
        }
      }
    ));
  }

  handleDataReceived = data => {
    this.props.dispatch(entityActions.setEntity({ type: 'plots', data }));
  };

  handleDraw = data => {
    this.props.drawingChannel.perform('draw', data);
  };

  handleSave = data => {
    this.props.drawingChannel.perform('save', data);
  };

  componentDidMount() {
    this.initializeWebsocket();
  }

  render () {
    return null;
  }
}

export default connect(Drawing.mapStateToProps)(Drawing);
