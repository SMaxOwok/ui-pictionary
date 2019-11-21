import React from 'react'

import Easel from 'components/Easel';

export default class Artist extends React.Component {

  handleUndo = () => {
    // Remove last line from history
    // Redraw from response
  };

  handleReset = () => {
    // Clear history
    // Redraw
  };

  handleSkip = () => {
    // Change the current word
  };

  render () {
    return (
      <div className='Artist'>
        <Easel
          header='The current word'
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
        />
      </div>
    );
  }
}
