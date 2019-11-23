import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withGame(WrappedComponent) {
  const displayName = `HigherOrder.WithGame(${getDisplayName(WrappedComponent)})`;

  class WithGame extends PureComponent {
    static mapStateToProps = state => (
      {
        game: get(state, 'entities.game')
      }
    );

    static displayName = displayName;

    render() {
      return React.createElement(WrappedComponent, { ...this.props });
    }
  }

  return connect(WithGame.mapStateToProps)(WithGame);
}
