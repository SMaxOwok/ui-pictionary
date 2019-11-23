import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import get from 'lodash/get';

import { entityActions } from 'store/actions';

class Team extends React.Component {
  static mapStateToProps = (state, ownProps) => (
    { team: get(state, `entities.team[${ownProps.teamId}]`) }
  );

  static propTypes = {
    name: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired,
    team: PropTypes.shape({
      id: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      players: PropTypes.array.isRequired
    })
  };

  initializeWebsocket() {
    App.cable.subscriptions.create(
      { channel: 'TeamChannel', id: this.props.teamId },
      {
        received: data => this.handleTeamUpdate(data)
      }
    );
  }

  handleTeamUpdate = team => {
    this.props.dispatch(entityActions.setEntities([team]));
  };

  componentDidMount() {
    this.initializeWebsocket();
  }

  render () {
    if (!this.props.team) return null;

    return (
      <div className='Team'>
        <div className='Team__scoreboard'>
          <div className='Team__name'>
            {this.props.name}
          </div>
          <div className='Team__score'>
            {this.props.team.score}
          </div>
        </div>

        <ul className='Team__player-list'>
          {this.props.team.players.map(player => (
            <li className='Team__player' key={player.id}>
              {player.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(Team.mapStateToProps)(Team);
