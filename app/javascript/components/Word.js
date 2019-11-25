import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: Will need palette classes
export default class Word extends Component {
  static propTypes = {
    word: PropTypes.string.isRequired
  };

  render () {
    if (!this.props.word) return null;

    return (
      <div className='Word'>
        {this.props.word}
      </div>
    );
  }
}
