import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';

class Jumbotron extends Component {
  static mapStateToProps = state => (
    { game: get(state, 'entities.game') }
  );

  static propTypes = {
    game: PropTypes.object.isRequired
  };

  get status() {
    switch (this.props.game.currentState) {
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
          {this.props.game.roundCount && `Round ${this.props.game.roundCount} of 10`}
        </div>

        <div className='Jumbotron__status'>
          {this.status}
        </div>
      </div>
    );
  }
}

export default connect(Jumbotron.mapStateToProps)(Jumbotron);
