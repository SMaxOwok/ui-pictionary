import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

import get from 'lodash/get';

import withCurrentUser from 'components/hoc/withCurrentUser';

import Modal from 'components/Modal';
import Team from './Team';

class TeamSelect extends Component {
  static mapStateToProps = state => (
    { teams: get(state, 'entities.team') }
  );

  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = { selectedId: null };

  get hasTeam() {
    if (!this.props.currentUser) return true;

    return !!this.props.currentUser.teamId;
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(playerActions.joinTeam(
      { teamId: this.state.selectedId }
    )).then(() => this.setState({ selectedId: null }));
  };

  handleTeamSelect = selectedId => {
    this.setState({ selectedId });
  };

  render() {
    return (
      <Modal visible={!this.hasTeam}>
        <div className='TeamSelect'>
          <div className='TeamSelect__title'>
            Select a team
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className='TeamSelect__teams'>
              {Object.keys(this.props.teams).map(id => (
                <Team
                  key={id}
                  team={this.props.teams[id]}
                  selectedId={this.state.selectedId}
                  onTeamSelect={this.handleTeamSelect}
                />
              ))}
            </div>

            <div className='TeamSelect__actions'>
              <button type='submit' className='Button' disabled={!this.state.selectedId}>
                Join game
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default withCurrentUser(connect(TeamSelect.mapStateToProps)(TeamSelect));
