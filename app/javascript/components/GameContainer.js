import React from 'react';
import PropTypes from 'prop-types'

import Jumbotron from './Jumbotron';
import Easels from './easels';
import Team from './Team';
import Login from './Login';
import Logout from './Logout';

export default class GameContainer extends React.Component {
  state = { currentUser: this.props.currentUser };

  static propTypes = {
    currentUser: PropTypes.object
  };

  get EaselComponent() {
    const Components = [Easels.Artist, Easels.Guesser, Easels.Spectator];

    return Components[Math.floor(Math.random() * Components.length)];
  }

  setCurrentUser = currentUser => {
    this.setState({ currentUser });
  };

  render () {
    return (
      <main className='GameContainer'>
        <Login
          currentUser={this.state.currentUser}
          onSuccess={this.setCurrentUser}
        />
        <Team name='Team A' players={[{ id: 1, name: 'Max'}, { id: 2, name: 'Skye' }]} />

        <div className='GameContainer__content'>
          <Jumbotron round={1} status='initialized' />
          <this.EaselComponent />
        </div>

        <Team name='Team B' />

        <Logout currentUser={this.state.currentUser} onSuccess={this.setCurrentUser} />
      </main>
    );
  }
}
