import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { entityActions, websocketActions } from 'store/actions';

import get from 'lodash/get';

class Team extends Component {
  static mapStateToProps = (state, ownProps) => (
    { teamChannel: get(state, `websockets.teamChannel:${ownProps.id}`) }
  );

  static propTypes = {
    id: PropTypes.string.isRequired
  };

  initializeWebsocket() {
    this.props.dispatch(websocketActions.connect(`teamChannel:${this.props.id}`));

    const teamSubscription = App.cable.subscriptions.create(
      { channel: 'TeamChannel', id: this.props.id },
      {
        received: data => this.handleDataReceived(data)
      }
    );

    this.props.dispatch(websocketActions.connected(
      {
        channel: `teamChannel:${this.props.id}`,
        subscription: {
          ...teamSubscription,
          ...teamSubscription.__proto__
        }
      }
    ));
  }

  handleDataReceived = data => {
    this.props.dispatch(entityActions.setEntities([data]));
  };

  componentDidMount() {
    this.initializeWebsocket();
  }

  render () {
    return null;
  }
}

export default connect(Team.mapStateToProps)(Team);
