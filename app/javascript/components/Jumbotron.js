import React from 'react'
import PropTypes from 'prop-types'

export default class Jumbotron extends React.Component {
  static propTypes = {
    round: PropTypes.number,
    status: PropTypes.string.isRequired
  };

  get status() {
    switch (this.props.status) {
      case 'initialized':
        return 'Initialized';
      case 'setup':
        return 'Setup';
      case 'pre_draw':
        return 'Pre-draw';
      case 'drawing':
        return 'Drawing';
      case 'completed':
        return 'Completed';
      default:
        return null;
    }
  }

  render () {
    return (
      <div className='Jumbotron'>
        <div className='Jumbotron__round'>
          {this.props.round && `Round ${this.props.round} of 10`}
        </div>

        <div className='Jumbotron__status'>
          {this.status}
        </div>
      </div>
    );
  }
}
