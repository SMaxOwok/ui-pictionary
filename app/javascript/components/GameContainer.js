import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionOverlay from 'components/ActionOverlay';
import Jumbotron from 'components/Jumbotron';
import GameState from 'components/GameState';
import Team from 'components/Team';
import Modal from 'components/modal';

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
        <Modal />
        <ActionOverlay />

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
