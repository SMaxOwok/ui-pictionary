import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TeamIcon from 'components/TeamIcon';

export default class Initialized extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    teams: PropTypes.object
  };

  static defaultProps = {
    teams: {}
  };

  currentUserOnTeam(team) {
    if (!this.props.currentUser) return null;

    return this.props.currentUser.teamId === team.id;
  }

  teamIconClasses(team) {
    return classnames(`TeamIcon TeamIcon--${team.palette}`, {
      'TeamIcon--selected': this.currentUserOnTeam(team)
    })
  }
  handleStartGame = () => {
    this.props.gameChannel.transition('setup');
  };

  render () {
    return (
      <div className='Initialized'>
        <div className='Initialized__teams'>
          {Object.keys(this.props.teams).map(id => {
            const team = this.props.teams[id];

            return (
              <TeamIcon
                key={id}
                team={team}
                wrapperClass={this.teamIconClasses(team)}
              />
            )
          })}
        </div>

        <button
          type='button'
          className='Initialized__button Button Button--primary'
          onClick={this.handleStartGame}
        >
          Start the game
        </button>
      </div>
    );
  }
}
