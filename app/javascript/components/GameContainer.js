import React from 'react';
import PropTypes from 'prop-types'

import Jumbotron from './Jumbotron';
import Easels from './easels';
import Team from './Team';
import Login from './Login';
import Logout from './Logout';

import CurrentUserContext from 'contexts/CurrentUserContext';

export default class GameContainer extends React.Component {
  state = { currentUser: this.props.currentUser, game: this.props.game };

  static propTypes = {
    game: PropTypes.object.isRequired,
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
      <CurrentUserContext.Provider value={{ currentUser: this.state.currentUser }}>
        <main className='GameContainer'>
          <Login onSuccess={this.setCurrentUser} />

          <Team name='Team A' players={[{ id: 1, name: 'Max'}, { id: 2, name: 'Skye' }]} />

          <div className='GameContainer__content'>
            <Jumbotron round={1} status='initialized' />
            <this.EaselComponent />
          </div>

        <Team name='Team B' />

          <Logout onSuccess={this.setCurrentUser} />
        </main>
      </CurrentUserContext.Provider>
    );
  }
}
