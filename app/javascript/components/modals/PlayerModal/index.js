import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withCurrentUser from 'components/hoc/withCurrentUser';

import Modal from 'components/Modal';
import Login from './Login';
import Verification from './Verification';
import NameEntry from './NameEntry';
import TeamSelect from './TeamSelect';

class PlayerModal extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  get visible() {
    return !!this.BodyComponent;
  }

  get authenticated() {
    return !!this.props.currentUser;
  }

  get named() {
    return !!this.props.currentUser.name;
  }

  get onTeam() {
    return !!this.props.currentUser.teamId;
  }

  get verified() {
    return !!this.props.currentUser.emailVerified;
  }

  get BodyComponent() {
    if (!this.authenticated) return <Login {...this.props} />;
    if (!this.verified) return <Verification {...this.props} />;
    if (!this.named) return <NameEntry {...this.props} />;
    if (!this.onTeam) return <TeamSelect {...this.props} />;

    return null;
  }

  render() {
    return (
      <Modal visible={this.visible}>
        {this.BodyComponent}
      </Modal>
    )
  }
}

export default withCurrentUser(connect(PlayerModal.mapStateToProps)(PlayerModal));
