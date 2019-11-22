import React from 'react';
import PropTypes from 'prop-types'

import Jumbotron from './Jumbotron';
import Easels from './easels';
import Team from './Team';
import Login from './Login';
import Logout from './Logout';

import withGame from 'components/hoc/withGame';

class GameContainer extends React.Component {
  static propTypes = {
    game: PropTypes.object,
    teams: PropTypes.object
  };

  static defaultProps = {
    game: null,
    teams: {}
  };

  get EaselComponent() {
    const Components = [Easels.Artist, Easels.Guesser, Easels.Spectator];

    return Components[Math.floor(Math.random() * Components.length)];
  }

  get teamA() {
    const id = this.props.game.teamIds[0];

    return this.props.teams[id];
  }

  get teamB() {
    const id = this.props.game.teamIds[1];

    return this.props.teams[id];
  }

  render () {
    if (!this.props.game) return null;

    return (
      <main className='GameContainer'>
        <Login />
        <Logout />

        <Team name='Team A' team={this.teamA} />

        <div className='GameContainer__content'>
          <Jumbotron round={1} status='initialized' />
          <this.EaselComponent />
        </div>

        <Team name='Team B' team={this.teamB} />
      </main>
    );
  }
}

export default withGame(GameContainer);
