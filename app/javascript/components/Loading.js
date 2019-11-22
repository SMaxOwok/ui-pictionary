import React from 'react';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  };

  render () {
    if (!this.props.visible) return null;

    return (
      <div className='Loading'>
        <div className='Loading__spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
