import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/Loading';

export default class Canvas extends React.Component {
  static propTypes = {
    drawable: PropTypes.bool.isRequired,
    drawingSubscription: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      currentPlots: [],
      isDrawing: false,
      loading: true
    }
  }

  get actionHandlers() {
    if (!this.props.drawable) return {};

    return {
      onMouseMove: this.handleDraw,
      onMouseDown: this.handleDrawStart,
      onMouseUp: this.handleDrawEnd
    }
  }

  initializeCanvas() {
    this.ctx = this.canvas.current.getContext('2d');
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  handleDrawStart = () => {
    this.setState({ isDrawing: true });
  };

  handleDrawEnd = () => {
    this.setState(state => {
      this.props.drawingSubscription.draw({ plots: state.currentPlots });

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
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.drawingSubscription && this.props.drawingSubscription) {
      this.setState({ loading: false });
    }

    if (JSON.stringify(prevProps.plots) !== JSON.stringify(this.props.plots)) {
      this.renderCanvas(this.props.plots);
    }
  }

  midpointOfLine(pointOne, pointTwo) {
    return {
      x: pointOne.x + (pointTwo.x - pointOne.x) / 2,
      y: pointOne.y + (pointTwo.y - pointOne.y) / 2
    };
  }

  renderCanvas(plots = this.state.currentPlots) {
    if (plots.length === 0) {
      return this.resetCanvas();
    }

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

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    this.ctx.beginPath();
  }

  render () {
    return (
      <div className='Canvas'>
        <Loading visible={this.state.loading} />

        <canvas
          ref={this.canvas}
          height={500}
          width={500}
          {...this.actionHandlers}
        />
      </div>
    );
  }
}
