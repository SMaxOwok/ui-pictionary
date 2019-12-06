import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Easel from 'components/Easel';
import SubmissionInput from 'components/SubmissionInput';
import withCurrentUser from 'components/hoc/withCurrentUser';

import get from 'lodash/get';

class Guesser extends Component {
  static mapStateToProps = state => (
    {
      gameChannel: get(state, 'websockets.gameChannel')
    }
  );

  static propTypes = {
    gameChannel: PropTypes.object,
    currentUser: PropTypes.object.isRequired
  };

  handleSubmit = word => {
    this.props.gameChannel.guessWord({
      word,
      player_id: this.props.currentUser.id
    });
  };

  render () {
    return (
      <div className='Guesser'>
        <Easel
          drawable={false}
          footer={(
            <div className='Guesser__toolbar'>
              <SubmissionInput
                buttonText='Guess'
                onSubmit={this.handleSubmit}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default withCurrentUser(connect(Guesser.mapStateToProps)(Guesser));
