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

  get subscription() {
    return App.cable.subscriptions.subscriptions[0];
  }

  initializeCanvas() {
    this.ctx = this.canvas.current.getContext('2d');
    this.ctx.lineWidth = 1;
  }

  initializeWebsocket() {
    App.cable.subscriptions.create(
      { channel: 'DrawingChannel' },
      {
        received: data => this.handleDrawingDataReceived(data),
        draw: function(data) {
          return this.perform('draw', data)
        }
      }
    );
  }

  handleDrawingDataReceived(data) {
    if (!data) return null;

    this.renderCanvas(data);
  }

  handleDrawStart = () => {
    this.setState({ isDrawing: true });
  };

  handleDrawEnd = () => {
    this.setState(state => {
      this.subscription.draw({ plots: state.currentPlots });

      return { isDrawing: false, currentPlots: [] };
    });
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
    this.initializeCanvas();
    this.initializeWebsocket();
  }

  renderCanvas(plots = this.state.currentPlots) {
    this.ctx.beginPath();
    this.ctx.moveTo(plots[0].x, plots[0].y);

    plots.forEach(plot => this.ctx.lineTo(plot.x, plot.y));

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
