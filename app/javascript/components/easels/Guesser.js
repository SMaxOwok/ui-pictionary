import React from 'react'
import PropTypes from 'prop-types'

import Easel from 'components/Easel';

export default class Guesser extends React.Component {
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
          header='Guess the drawing'
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
        />
      </div>
    );
  }
}
