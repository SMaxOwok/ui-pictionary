import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Word extends Component {
  static propTypes = {
    word: PropTypes.string.isRequired
  };

  render () {
    if (!this.props.word) return null;

    return (
      <li className='Word'>
        {this.props.word}
      </li>
    );
  }
}
