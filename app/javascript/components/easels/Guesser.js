import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Easel from 'components/Easel';
import get from 'lodash/get';

class Guesser extends Component {
  static mapStateToProps = state => (
    {
      drawingChannel: get(state, 'websockets.drawingChannel')
    }
  );

  static propTypes = {
    drawingChannel: PropTypes.object
  };

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
                type='text'
                placeholder='Enter a word...'
                value={this.state.guess}
                onChange={this.handleInputChange}
              />
              <button
                className='Button Button--primary'
                onClick={this.handleSubmit}
              >
                Guess
              </button>
            </div>
          )}
        />
      </div>
    );
  }
}

export default connect(Guesser.mapStateToProps)(Guesser);
