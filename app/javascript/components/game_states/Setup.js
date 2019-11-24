import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Setup extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  render () {
    return (
      <div className='Setup'>

      </div>
    );
  }
}
