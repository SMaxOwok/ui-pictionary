import React from 'react'
import PropTypes from 'prop-types'

export default class Team extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    team: PropTypes.shape({
      score: PropTypes.number.isRequired,
      players: PropTypes.array.isRequired
    })
  };

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
