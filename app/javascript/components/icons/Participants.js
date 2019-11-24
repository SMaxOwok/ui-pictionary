import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Participants extends PureComponent {
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
          d='M2 30.333A27.933 27.933 0 005 43a28.333 28.333 0 0025.333 15.667c4.4.011 8.74-1.017 12.667-3L62 62l-6.333-19a27.935 27.935 0 003-12.667A28.333 28.333 0 0043 5a27.933 27.933 0 00-12.667-3h-1.666A28.267 28.267 0 002 28.667v1.666z'
          fill='#2166D7' stroke='#2166D7' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'/>
        <path
          d='M27.545 20v9.403c0 .997.05 1.978.148 2.942.099.954.23 1.967.395 3.041h2.745a62.97 62.97 0 00.394-3.04c.099-.965.148-1.946.148-2.943V20h-3.83zM32 41.534c0-.34-.06-.663-.18-.97a2.489 2.489 0 00-.527-.789 2.698 2.698 0 00-.805-.526 2.477 2.477 0 00-.987-.197c-.34 0-.663.066-.97.197-.306.132-.57.307-.788.526-.22.22-.395.483-.527.79-.131.306-.197.63-.197.97 0 .35.066.679.197.986.132.295.307.553.526.772.22.22.483.39.79.51.306.131.63.197.97.197.35 0 .679-.066.986-.197.306-.12.575-.29.805-.51.22-.219.395-.477.526-.773.12-.306.181-.635.181-.986z'
          fill='#fff'/>
      </svg>
    )
  }
}
