import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faComment } from '@fortawesome/free-regular-svg-icons';

import Loading from 'components/Loading';

import { leaderboardActions } from 'store/actions';

class Leaderboard extends Component {
  static mapStateToProps = state => {
    return {
      guessers: state.leaderboard.guessers,
      drawers: state.leaderboard.drawers,
    }
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    drawers: PropTypes.array.isRequired,
    guessers: PropTypes.array.isRequired
  };

  state = { loading: false };

  get leaderboardLoaded() {
    return this.props.drawers.length || this.props.guessers.length;
  }

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

  fetchLeaderboard() {
    if (this.leaderboardLoaded) {
      this.updateLeaderboard();
    } else {
      this.loadLeaderboard();
    }
  }

  loadLeaderboard() {
    this.setState({ loading: true }, () => {
      this.updateLeaderboard().then(() => {
        this.setState({ loading: false });
      });
    });
  }

  updateLeaderboard() {
    return this.props.dispatch(leaderboardActions.fetchLeaderboard());
  }

  componentDidMount() {
    this.fetchLeaderboard();
  }

  render() {
    return (
      <div className='Leaderboard'>
        <Loading visible={this.state.loading} />

        <div className='Modal__title'>
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
                {this.props.drawers.map((player, index) => (
                  <li className='Leaderboard__player' key={player.id} >
                    <div className='Leaderboard__player__name'>
                      {player.name}
                    </div>
                    <div className='Leaderboard__player__score'>
                      {player.drawCount} drawings guessed
                    </div>
                    <span className='Leaderboard__player__position'>
                    {this.ordinalForPosition(index)}
                  </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='Leaderboard__list'>
              <div className='Leaderboard__list__header'>
                <FontAwesomeIcon icon={faComment} />
                Top Guessers
              </div>

              <ul className='Leaderboard__players'>
                {this.props.guessers.map((player, index) => (
                  <li className='Leaderboard__player' key={player.id}>
                    <div className='Leaderboard__player__name'>
                      {player.name}
                    </div>
                    <div className='Leaderboard__player__score'>
                      {player.guessCount} correct guesses
                    </div>
                    <span className='Leaderboard__player__position'>
                    {this.ordinalForPosition(index)}
                  </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='Modal__actions'>
            <button type='submit' className='Modal__button Button Button--primary'>
              Close
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(Leaderboard.mapStateToProps)(Leaderboard);
