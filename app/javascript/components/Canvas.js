import React from 'react'
import PropTypes from 'prop-types'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      currentPlots: [],
      isDrawing: false
    }
  }

  handleDrawStart = () => {
    this.setState({ isDrawing: true });
  };

  handleDrawEnd = () => {
    this.setState({ isDrawing: false, currentPlots: [] });
  };

  handleDraw = event => {
    if (!this.state.isDrawing) return null;

    const x = event.nativeEvent.offsetX || event.nativeEvent.layerX - this.canvas.offsetLeft;
    const y = event.nativeEvent.offsetY || event.nativeEvent.layerY - this.canvas.offsetTop;

    this.setState(state => {
      return { currentPlots: [...state.currentPlots, { x, y }] };
    }, this.renderCanvas)
  };

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    this.ctx.lineWidth = 1;
  }

  renderCanvas() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.state.currentPlots[0].x, this.state.currentPlots[0].y);

    this.state.currentPlots.forEach(plot => this.ctx.lineTo(plot.x, plot.y));

    this.ctx.stroke();
  }

  render () {
    return (
      <canvas
        className="Canvas"
        ref={this.canvas}
        height={600}
        width={800}
        onMouseMove={this.handleDraw}
        onMouseDown={this.handleDrawStart}
        onMouseUp={this.handleDrawEnd}
      />
    );
  }
}
