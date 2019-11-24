import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionOverlay from 'components/ActionOverlay';
import Jumbotron from 'components/Jumbotron';
import Easels from 'components/easels';
import Team from 'components/Team';
import TeamSelect from 'components/TeamSelect';
import Login from 'components/Login';

import get from 'lodash/get';

class GameContainer extends React.Component {
  static mapStateToProps = state => (
    { game: get(state, 'entities.game') }
  );

  static propTypes = {
    game: PropTypes.object
  };

  get EaselComponent() {
    const Components = [Easels.Artist, Easels.Guesser, Easels.Spectator];

    return Components[Math.floor(Math.random() * Components.length)];
  }

  render () {
    if (!this.props.game) return null;

    return (
      <main className='GameContainer'>
        <ActionOverlay />
        <Login />
        <TeamSelect />

        <Team id={this.props.game.teamIds[0]} />

        <div className='GameContainer__content'>
          <Jumbotron round={1} status='initialized' />
          <Easels.Artist />
        </div>

        <Team id={this.props.game.teamIds[1]} />
      </main>
    );
  }
}

export default connect(GameContainer.mapStateToProps)(GameContainer);
