import React from 'react'
import PropTypes from 'prop-types'

export default class Team extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    players: PropTypes.array
  };

  static defaultProps = {
    players: []
  };

  render () {
    return (
      <div className='Team'>
        <div className='Team__scoreboard'>
          <div className='Team__name'>
            {this.props.name}
          </div>
          <div className='Team__score'>
            0
          </div>
        </div>

        <ul className='Team__player-list'>
          {this.props.players.map(player => (
            <li className='Team__player' key={player.id}>
              {player.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
