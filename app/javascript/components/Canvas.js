import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import get from 'lodash/get';

class Canvas extends React.Component {
  static mapStateToProps = state => (
    {
      drawTeamId: get(state, 'entities.game.currentRound.team'),
      teams: get(state, 'entities.team'),
      drawingChannel: get(state, 'websockets.drawingChannel'),
      plots: get(state, 'entities.plots.data' )
    }
  );

  static propTypes = {
    drawable: PropTypes.bool.isRequired,
    drawingChannel: PropTypes.object,
    plots: PropTypes.array,
    palette: PropTypes.string
  };

  static defaultProps = {
    plots: []
  };

  constructor(props) {
    super(props);
    this.canvas = props.canvasRef || React.createRef();
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

  get color() {
    if (!this.props.drawTeamId) return null;
    const team = this.props.teams[this.props.drawTeamId];

    if (!team) return null;
    const palette =team.palette;

    if (palette === 'primary') return '#1dad63';
    if (palette === 'secondary') return '#2166d7';

    return '#000';
  }

  initializeCanvas() {
    this.ctx = this.canvas.current.getContext('2d');
    this.setCanvasSize();
  }

  handleDrawStart = () => {
    this.setState({ isDrawing: true });
  };

  handleDrawEnd = () => {
    this.setState(state => {
      if (state.currentPlots.length === 0) return { isDrawing: false };

      this.props.drawingChannel.draw({ plots: state.currentPlots });

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
    window.addEventListener('resize', this.setCanvasSize);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.plots) !== JSON.stringify(this.props.plots)) {
      this.renderCanvas(this.props.plots);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setCanvasSize);
  }

  setCanvasSize = () => {
    if (!this.canvas) return null;
    const data = this.ctx.getImageData(0, 0, this.canvas.current.width, this.canvas.current.height);

    this.canvas.current.width = this.canvas.current.parentElement.clientWidth;
    this.canvas.current.height = this.canvas.current.parentElement.clientHeight;

    this.ctx.putImageData(data, 0, 0);
  };

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

    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

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
        <canvas
          ref={this.canvas}
          height='100%'
          width='100%'
          {...this.actionHandlers}
        />
      </div>
    );
  }
}

const ConnectedCanvas = connect(Canvas.mapStateToProps)(Canvas);

export default React.forwardRef((props, ref) => <ConnectedCanvas canvasRef={ref} {...props} />);
