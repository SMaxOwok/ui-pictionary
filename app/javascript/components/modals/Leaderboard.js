import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faComment } from '@fortawesome/free-regular-svg-icons';

import Modal from 'components/Modal';

export default class Leaderboard extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  // TODO: Fetch from API and pull from store
  state = {
    players: [
      { name: 'Max', guessCount: 100, drawCount: 100 },
      { name: 'Max', guessCount: 90, drawCount: 90 },
      { name: 'Max', guessCount: 80, drawCount: 80 },
      { name: 'Max', guessCount: 70, drawCount: 70 },
      { name: 'Max', guessCount: 60, drawCount: 60 },
    ]
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onClose();
  };

  ordinalForPosition(index) {
    const position = index + 1;

    switch (position) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${position}th`;
    }
  }

  render() {
    return (
      <Modal visible={this.props.visible}>
        <div className='Leaderboard'>
          <div className='Leaderboard__title'>
            <FontAwesomeIcon icon={faTrophy} />
            Leaderboard
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className='Leaderboard__lists'>
              <div className='Leaderboard__list'>
                <div className='Leaderboard__list__header'>
                  <FontAwesomeIcon icon={faEdit} />
                  Top Drawers
                </div>

                <ul className='Leaderboard__players'>
                  {this.state.players.map((player, index) => (
                    <div className='Leaderboard__player'>
                      <div className='Leaderboard__player__name'>
                        {player.name}
                      </div>
                      <div className='Leaderboard__player__score'>
                        {player.drawCount} drawings guessed
                      </div>
                      <span className='Leaderboard__player__position'>
                      {this.ordinalForPosition(index)}
                    </span>
                    </div>
                  ))}
                </ul>
              </div>

              <div className='Leaderboard__list'>
                <div className='Leaderboard__list__header'>
                  <FontAwesomeIcon icon={faComment} />
                  Top Guesses
                </div>

                <ul className='Leaderboard__players'>
                  {this.state.players.map((player, index) => (
                    <div className='Leaderboard__player'>
                      <div className='Leaderboard__player__name'>
                        {player.name}
                      </div>
                      <div className='Leaderboard__player__score'>
                        {player.guessCount} correct guesses
                      </div>
                      <span className='Leaderboard__player__position'>
                      {this.ordinalForPosition(index)}
                    </span>
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            <button type='submit' className='Leaderboard__button Button Button--primary'>
              Close
            </button>
          </form>
        </div>
      </Modal>
    )
  }
}
