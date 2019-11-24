import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class UILogo extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    height: 24,
    width: 24
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
        <rect width={this.width} height={this.height} rx='4' fill='#6DBD63'/>
        <path
          d='M9.836 16.8c-1.361 0-2.423-.373-3.186-1.12-.753-.745-1.13-1.81-1.13-3.195V7.2h2.206v5.204c0 1.69.708 2.535 2.124 2.535.69 0 1.216-.202 1.58-.607.363-.413.544-1.056.544-1.928V7.2h2.179v5.285c0 1.385-.381 2.45-1.144 3.196-.753.746-1.81 1.119-3.173 1.119zM16.514 7.2h2.206v9.438h-2.206V7.2z'
          fill='#fff'/>
      </svg>
    )
  }
}
