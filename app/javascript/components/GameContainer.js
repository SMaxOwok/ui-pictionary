import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import get from 'lodash/get';

import Jumbotron from './Jumbotron';
import Easels from './easels';
import Team from './Team';
import Login from './Login';
import Logout from './Logout';

class GameContainer extends React.Component {
  static mapStateToProps = state => {
    return {
      currentUser: get(state, 'authentication.currentUser')
    };
  };

  static propTypes = {
    game: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  get EaselComponent() {
    const Components = [Easels.Artist, Easels.Guesser, Easels.Spectator];

    return Components[Math.floor(Math.random() * Components.length)];
  }

  render () {
    return (
      <main className='GameContainer'>
        <Login />

        <Team name='Team A' players={[{ id: 1, name: 'Max'}, { id: 2, name: 'Skye' }]} />

        <div className='GameContainer__content'>
          <Jumbotron round={1} status='initialized' />
          <this.EaselComponent />
        </div>

        <Team name='Team B' />

        <Logout />
      </main>
    );
  }
}

export default connect(GameContainer.mapStateToProps)(GameContainer);
