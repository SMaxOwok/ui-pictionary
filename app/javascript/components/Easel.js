import React from 'react'
import PropTypes from 'prop-types'

import Canvas from './Canvas';

export default class Easel extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    footer: PropTypes.node,
    drawable: PropTypes.bool
  };

  static defaultProps = {
    drawable: true
  };

  render () {
    return (
      <div className='Easel'>
        <div className='Easel__header'>
          {this.props.header}
        </div>

        <Canvas drawable={this.props.drawable} />

        <div className='Easel__footer'>
          {this.props.footer && this.props.footer}
        </div>
      </div>
    );
  }
}
