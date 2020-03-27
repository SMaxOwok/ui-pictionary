import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withCurrentUser from 'components/hoc/withCurrentUser';

import { modalActions } from 'store/actions';

import Icon from 'components/icons/Icon';
import Modals from './modals';

class Modal extends Component {
  static mapStateToProps = state => (
    { modal: state.modal }
  );

  static propTypes = {
    currentUser: PropTypes.object,
    modal: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  get modalClasses() {
    return classnames('Modal', {
      'Modal--hidden': !this.BodyComponent
    })
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

  get childProps() {
    return {
      ...this.props,
      handleClose: this.handleModalClose
    }
  }

  get BodyComponent() {
    if (!this.authenticated) return Modals.Login;
    if (!this.verified) return Modals.Verification;
    if (!this.named) return Modals.NameEntry;
    if (!this.onTeam) return Modals.TeamSelect;

    switch (this.props.modal) {
      case 'profile':
        return Modals.Profile;
      case 'howToPlay':
        return Modals.HowToPlay;
      case 'leaderboard':
        return Modals.Leaderboard;
      default:
        return null;
    }
  }

  handleModalClose = () => {
    this.props.dispatch(modalActions.closeModal());
  };

  render() {
    return (
      <div className={this.modalClasses}>
        <div className='Modal__content'>
          <div className='Modal__header'>
            <Icon name='UILogo' className='Modal__ui-logo' />
            UI Pictionary
          </div>

          <div className='Modal__body'>
            {this.BodyComponent && <this.BodyComponent  {...this.childProps} />}
          </div>
        </div>
      </div>
    )
  }
}

export default withCurrentUser(connect(Modal.mapStateToProps)(Modal));
