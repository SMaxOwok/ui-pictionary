import React from 'react'

import Easel from 'components/Easel';
import subscribedToDrawingChannel from 'components/hoc/subscribedToDrawingChannel';

class Artist extends React.Component {
  handleUndo = () => {
    // Remove last line from history
    // Redraw from response
  };

  handleReset = () => {
    this.props.drawingSubscription.draw({ plots: [] });
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
              <button className='Button Button--primary' onClick={this.handleReset}>
                Reset
              </button>
              <button className='Button Button--primary' onClick={this.handleSkip}>
                Skip
              </button>
            </div>
          )}
          {...this.props}
        />
      </div>
    );
  }
}

export default subscribedToDrawingChannel(Artist);
