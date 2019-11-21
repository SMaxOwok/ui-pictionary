import React from 'react'

import Jumbotron from './Jumbotron';
import Easels from './easels';
import Team from './Team';

export default class GameContainer extends React.Component {

  get EaselComponent() {
    const Components = [Easels.Artist, Easels.Guesser, Easels.Spectator];

    return Components[Math.floor(Math.random() * Components.length)];
  }

  render () {
    return (
      <div className='GameContainer'>
        <Team name='Team A' players={[{ id: 1, name: 'Max'}, { id: 2, name: 'Skye' }]} />

        <div className='GameContainer__content'>
          <Jumbotron round={1} status='initialized' />
          <this.EaselComponent />
        </div>

        <Team name='Team B' />
      </div>
    );
  }
}
