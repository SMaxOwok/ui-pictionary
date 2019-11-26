import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withCurrentUser from 'components/hoc/withCurrentUser';

import { authenticationActions, websocketActions } from 'store/actions';

import get from 'lodash/get';

class Me extends Component {
  static mapStateToProps = state => (
    { meChannel: get(state, 'websockets.meChannel') }
  );

  static propTypes = {
    meChannel: PropTypes.object,
    currentUser: PropTypes.object
  };

  initializeWebsocket() {
    this.props.dispatch(websocketActions.connect('meChannel'));

    const meSubscription = App.cable.subscriptions.create(
      { channel: 'PlayerChannel', id: this.props.currentUser.id },
      {
        received: data => this.handleDataReceived(data)
      }
    );

    this.props.dispatch(websocketActions.connected(
      {
        channel: 'meChannel',
        subscription: {
          ...meSubscription,
          ...meSubscription.__proto__
        }
      }
    ));
  }

  handleDataReceived = data => {
    console.log(data)
    this.props.dispatch(authenticationActions.setCurrentUser(data));
  };

  componentDidMount() {
    if (!this.props.currentUser) return null;

    this.initializeWebsocket();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.currentUser && this.props.currentUser) {
      this.initializeWebsocket();
    }

    if (prevProps.currentUser && !this.props.currentUser) {
      this.props.dispatch(websocketActions.disconnect('meChannel'));
    }
  }

  render () {
    return null;
  }
}

export default withCurrentUser(connect(Me.mapStateToProps)(Me));
