import React from 'react';
import PropTypes from 'prop-types'

import Jumbotron from 'components/Jumbotron';
import Easels from 'components/easels';
import Team from 'components/Team';
import TeamSelect from 'components/TeamSelect';
import Login from 'components/Login';
import Logout from 'components/Logout';

import withGame from 'components/hoc/withGame';

class GameContainer extends React.Component {
  static propTypes = {
    game: PropTypes.object
  };

  static defaultProps = {
    game: null
  };

  get EaselComponent() {
    const Components = [Easels.Artist, Easels.Guesser, Easels.Spectator];

    return Components[Math.floor(Math.random() * Components.length)];
  }

  render () {
    if (!this.props.game) return null;

    return (
      <main className='GameContainer'>
        <Login />
        <Logout />
        <TeamSelect />

        <Team name='Team A' teamId={this.props.game.teamIds[0]} />

        <div className='GameContainer__content'>
          <Jumbotron round={1} status='initialized' />
          <this.EaselComponent />
        </div>

        <Team name='Team B' teamId={this.props.game.teamIds[1]} />
      </main>
    );
  }
}

export default withGame(GameContainer);
