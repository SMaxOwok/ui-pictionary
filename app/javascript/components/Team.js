import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import get from 'lodash/get';

class Team extends React.Component {
  static mapStateToProps = (state, ownProps) => (
    { team: get(state, `entities.team[${ownProps.id}]`) }
  );

  static propTypes = {
    team: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      players: PropTypes.array.isRequired
    })
  };

  render () {
    if (!this.props.team) return null;

    return (
      <div className={`Team Team--${this.props.team.palette}`}>
        <div className='Team__scoreboard'>
          <div className='Team__name'>
            {this.props.team.name}
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
