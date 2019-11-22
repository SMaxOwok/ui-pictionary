import React, { Component } from 'react';

export default function subscribedToDrawingChannel(WrappedComponent) {
  return class extends Component {
    state = { drawingSubscription: null, plots: [] };

    initializeWebsocket() {
      const drawingSubscription = App.cable.subscriptions.create(
        { channel: 'DrawingChannel' },
        {
          received: data => this.handleDrawingDataReceived(data),
          draw: function(data) {
            return this.perform('draw', data)
          }
        }
      );

      this.setState({ drawingSubscription });
    }

    componentDidMount() {
      this.initializeWebsocket();
    }

    handleDrawingDataReceived = data => {
      if (!data) return null;

      this.setState({ plots: data });
    };

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
}
