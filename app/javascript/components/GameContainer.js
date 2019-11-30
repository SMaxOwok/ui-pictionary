import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionOverlay from 'components/ActionOverlay';
import Jumbotron from 'components/Jumbotron';
import GameState from 'components/GameState';
import Team from 'components/Team';
import { Login, TeamSelect } from 'components/modals';

import get from 'lodash/get';

class GameContainer extends React.Component {
  static mapStateToProps = state => (
    { game: get(state, 'entities.game') }
  );

  static propTypes = {
    game: PropTypes.object
  };

  render () {
    if (!this.props.game) return null;

    return (
      <main className='GameContainer'>
        <ActionOverlay />
        <Login />
        <TeamSelect />

        <Team id={this.props.game.teamIds[0]} />

        <div className='GameContainer__content'>
          <Jumbotron game={this.props.game} />
          <GameState game={this.props.game} />
        </div>

        <Team id={this.props.game.teamIds[1]} />
      </main>
    );
  }
}

export default connect(GameContainer.mapStateToProps)(GameContainer);
