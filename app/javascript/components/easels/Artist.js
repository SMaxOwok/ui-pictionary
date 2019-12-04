import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Easel from 'components/Easel';
import get from 'lodash/get';

class Artist extends Component {
  static mapStateToProps = state => (
    {
      drawingChannel: get(state, 'websockets.drawingChannel'),
    }
  );

  static propTypes = {
    drawingChannel: PropTypes.object
  };

  handleUndo = () => {
    // Remove last line from history
    // Redraw from response
  };

  handleClear = () => {
    this.props.drawingChannel.draw({ plots: [] });
  };

  handleSkip = () => {
    // Change the current word
  };

  render () {
    return (
      <div className='Artist'>
        <Easel
          footer={(
            <div className='Artist__toolbar'>
              <button className='Button Button--primary' onClick={this.handleUndo}>
                Undo
              </button>
              <button className='Button Button--primary' onClick={this.handleSkip}>
                Skip
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
