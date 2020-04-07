import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';;

import Easel from 'components/Easel';

import get from 'lodash/get';

class Artist extends Component {
  static mapStateToProps = state => (
    {
      drawingChannel: get(state, 'websockets.drawingChannel'),
      gameChannel: get(state, 'websockets.gameChannel'),
      plots: get(state, 'entities.plots.data')
    }
  );

  static propTypes = {
    game: PropTypes.object.isRequired,
    drawingChannel: PropTypes.object,
    plots: PropTypes.array
  };

  static defaultProps = {
    plots: []
  };

  canvas = React.createRef();

  get skipCount() {
    return this.props.game.currentRound.skips;
  }

  get currentWord() {
    return this.props.game.currentRound.currentWord;
  }

  get hasDrawing() {
    return this.props.plots.length > 0;
  }

  handleClear = () => {
    this.props.drawingChannel.draw({ plots: [] });
  };

  handleSkip = () => {
    this.handleClear();
    this.props.gameChannel.skipWord();
  };

  handleWordChange(prevWord) {
    if (!prevWord) return null;
    if (!this.hasDrawing) return null;

    this.saveDrawing(prevWord);
    this.handleClear();
  }

  saveDrawing(word) {
    if (!this.canvas.current) return null;

    const image = this.canvas.current.toDataURL('image/png');
    if (!image) return null;

    this.props.drawingChannel.save({ word: word, image });
  };

  componentDidUpdate(prevProps) {
    const prevWord = prevProps.game.currentRound.currentWord;

    if (prevWord !== this.currentWord) this.handleWordChange(prevWord);
  }

  render () {
    return (
      <div className='Artist'>
        <Easel
          ref={this.canvas}
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
