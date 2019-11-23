import React from 'react';

import Easel from 'components/Easel';
import subscribedToDrawingChannel from 'components/hoc/subscribedToDrawingChannel';

class Guesser extends React.Component {
  state = { guess: '' };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ guess: value });
  };

  handleSubmit = () => {
    // Send message through game channel
  };

  render () {
    return (
      <div className='Guesser'>
        <Easel
          drawable={false}
          footer={(
            <div className='Guesser__toolbar'>
              <input
                className='Guesser__input'
                type='text'
                placeholder='Type here...'
                value={this.state.guess}
                onChange={this.handleInputChange}
              />
              <button
                className='Button Button--primary'
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
          {...this.props}
        />
      </div>
    );
  }
}

export default subscribedToDrawingChannel(Guesser);
