import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Drawing extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
  };

  handleTransition = () => {
    this.props.gameChannel.transition('pre_draw');
  };

  render () {
    return (
      <div className='PreDraw'>
        <button
          type='button'
          className='Button Button--primary'
          onClick={this.handleTransition}
        >
          Next state
        </button>
      </div>
    );
  }
}
