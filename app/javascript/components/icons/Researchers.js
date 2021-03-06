import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Researchers extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    height: 64,
    width: 64
  };

  get height() {
    return this.props.height;
  };

  get width() {
    return this.props.width;
  }

  render() {
    return (
      <svg className={this.props.className} width={this.width} height={this.height} fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M62 30.333c.011 4.4-1.016 8.74-3 12.667a28.333 28.333 0 01-25.333 15.667c-4.4.011-8.74-1.017-12.667-3L2 62l6.333-19a27.934 27.934 0 01-3-12.667A28.334 28.334 0 0121 5a27.933 27.933 0 0112.667-3h1.666A28.267 28.267 0 0162 28.667v1.666z'
          fill='#1DAD63' stroke='#1DAD63' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'/>
        <path
          d='M26 22.39c.369-.325.77-.634 1.203-.927a9.006 9.006 0 011.431-.764 8.47 8.47 0 011.659-.504A9.071 9.071 0 0132.228 20c.943 0 1.8.13 2.569.39.78.26 1.447.634 2 1.122a4.888 4.888 0 011.284 1.74c.304.683.456 1.447.456 2.293 0 .824-.12 1.539-.358 2.146a5.795 5.795 0 01-.91 1.561c-.358.445-.749.83-1.171 1.155l-1.204.926c-.38.282-.71.564-.992.846-.27.27-.433.58-.487.927l-.374 2.374h-2.748l-.277-2.65A.695.695 0 0130 32.7v-.147c0-.477.12-.889.358-1.236.238-.358.536-.688.894-.992.358-.314.743-.618 1.155-.91a10.91 10.91 0 001.154-.944c.358-.346.656-.737.894-1.17.239-.434.358-.943.358-1.529 0-.39-.076-.737-.228-1.04a2.187 2.187 0 00-.601-.797 2.65 2.65 0 00-.943-.52 3.684 3.684 0 00-1.171-.18c-.618 0-1.144.071-1.577.212-.423.13-.786.282-1.09.455a9.564 9.564 0 00-.748.456c-.206.13-.39.195-.553.195-.39 0-.672-.163-.845-.488L26 22.39zm3.073 19.171c0-.336.06-.656.179-.96.13-.303.304-.563.52-.78.228-.217.494-.39.797-.52a2.45 2.45 0 01.976-.195c.336 0 .655.065.96.195.303.13.563.303.78.52.216.217.39.477.52.78.13.304.195.624.195.96 0 .347-.065.672-.195.976-.13.292-.304.547-.52.764a2.255 2.255 0 01-.78.504 2.41 2.41 0 01-.96.195 2.45 2.45 0 01-.976-.195 2.432 2.432 0 01-.797-.504 2.512 2.512 0 01-.52-.764 2.645 2.645 0 01-.179-.976z'
          fill='#fff'/>
      </svg>
    )
  }
}
