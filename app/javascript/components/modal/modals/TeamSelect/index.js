import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerActions } from 'store/actions';

import get from 'lodash/get';

import TeamOption from './TeamOption';

class TeamSelect extends Component {
  static mapStateToProps = state => (
    { teamIds: Object.keys(get(state, 'entities.team')) }
  );

  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = { selectedId: null };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(playerActions.joinTeam(
      { teamId: this.state.selectedId }
    ));
  };

  handleTeamSelect = selectedId => {
    this.setState({ selectedId });
  };

  render() {
    return (
      <div className='TeamSelect'>
        <div className='Modal__title'>
          Select a team
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className='TeamSelect__teams'>
            {this.props.teamIds.map(id => (
              <TeamOption
                key={id}
                id={id}
                selectedId={this.state.selectedId}
                onTeamSelect={this.handleTeamSelect}
              />
            ))}
          </div>

          <div className='Modal__actions'>
            <button type='submit' className='Modal__button Button Button--primary' disabled={!this.state.selectedId}>
              Join game
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(TeamSelect.mapStateToProps)(TeamSelect);
