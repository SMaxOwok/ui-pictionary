import React from 'react';
import { connect } from 'react-redux';

import { entityActions, websocketActions } from 'store/actions';

import get from 'lodash/get';

class Drawing extends React.Component {
  static mapStateToProps = state => (
    { drawingChannel: get(state, 'websockets.drawingChannel') }
  );

  initializeWebsocket() {
    this.props.dispatch(websocketActions.connect('drawingChannel'));

    const drawingSubscription = App.cable.subscriptions.create(
      { channel: 'DrawingChannel' },
      {
        received: data => this.handleDataReceived(data),
        draw: data  => this.handleDraw(data)
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

  handleDataReceived = (data) => {
    this.props.dispatch(entityActions.setEntity({ type: 'plots', data }));
  };

  handleDraw = data => {
    this.props.drawingChannel.perform('draw', data);
  };

  componentDidMount() {
    this.initializeWebsocket();
  }

  render () {
    return null;
  }
}

export default connect(Drawing.mapStateToProps)(Drawing);
