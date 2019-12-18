import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Easel from 'components/Easel';
import get from 'lodash/get';

class Artist extends Component {
  static mapStateToProps = state => (
    {
      drawingChannel: get(state, 'websockets.drawingChannel'),
      gameChannel: get(state, 'websockets.gameChannel'),
    }
  );

  static propTypes = {
    game: PropTypes.object.isRequired,
    drawingChannel: PropTypes.object
  };

  get skipCount() {
    return this.props.game.currentRound.skips;
  }

  handleClear = () => {
    this.props.drawingChannel.draw({ plots: [] });
  };

  handleSkip = () => {
    this.props.gameChannel.skipWord();
  };

  render () {
    return (
      <div className='Artist'>
        <Easel
          footer={(
            <div className='Artist__toolbar'>
              <button
                className='Button Button--primary'
                disabled={this.skipCount === 0}
                onClick={this.handleSkip}
              >
                Skip
                <span className='Artist__toolbar__skip-count'>
                  ({this.skipCount})
                </span>
              </button>
              <button className='Button Button--primary' onClick={this.handleClear}>
                Clear
              </button>
            </div>
          )}
        />
      </div>
    );
  }
}

export default connect(Artist.mapStateToProps)(Artist);
