import React from 'react'
import PropTypes from 'prop-types'

import Canvas from './Canvas';

export default class GameContainer extends React.Component {
  render () {
    return (
      <div>
        <Canvas />
      </div>
    );
  }
}
