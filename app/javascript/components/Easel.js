import React from 'react'
import PropTypes from 'prop-types'

import Canvas from './Canvas';

class Easel extends React.Component {
  static propTypes = {
    footer: PropTypes.node,
    drawable: PropTypes.bool
  };

  static defaultProps = {
    drawable: true
  };

  render () {
    return (
      <div className='Easel'>
        <Canvas
          canvasRef={this.props.canvasRef}
          drawable={this.props.drawable}
        />

        <div className='Easel__footer'>
          {this.props.footer && this.props.footer}
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <Easel canvasRef={ref} {...props} />);
