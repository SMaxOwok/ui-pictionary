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
    return App.cable.subscriptions.subscriptions.find(sub => (
      sub.identifier === '{"channel":"DrawingChannel"}'
    ));
  }

  initializeCanvas() {
    this.ctx = this.canvas.current.getContext('2d');
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
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

  midpointOfLine(pointOne, pointTwo) {
    return {
      x: pointOne.x + (pointTwo.x - pointOne.x) / 2,
      y: pointOne.y + (pointTwo.y - pointOne.y) / 2
    };
  }

  renderCanvas(plots = this.state.currentPlots) {
    if (plots.length === 0) return null;

    let pointOne = plots[0];
    let pointTwo = plots[1];

    this.ctx.beginPath();
    this.ctx.moveTo(pointOne.x, pointOne.y);

    for (let i = 1, len = plots.length; i < len; i++) {
      const midPoint = this.midpointOfLine(pointOne, pointTwo);
      this.ctx.quadraticCurveTo(pointOne.x, pointOne.y, midPoint.x, midPoint.y);
      pointOne = plots[i];
      pointTwo = plots[i + 1];
    }

    this.ctx.lineTo(pointOne.x, pointOne.y);
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
