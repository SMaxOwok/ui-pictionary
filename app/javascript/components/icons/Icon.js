import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icons from 'components/icons';

export default class Icon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number
  };

  get Component() {
    return Icons[this.props.name];
  }

  render() {
    if (!this.Component) return null;

    return (
      <this.Component
        className={this.props.className}
        height={this.props.height}
        width={this.props.width}
      />
    );
  }
}
