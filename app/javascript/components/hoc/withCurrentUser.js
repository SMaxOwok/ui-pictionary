import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withCurrentUser(WrappedComponent) {
  const displayName = `HigherOrder.WithCurrentUser(${getDisplayName(WrappedComponent)})`;

  class WithCurrentUser extends PureComponent {
    static mapStateToProps = state => (
      { currentUser: get(state, 'authentication.currentUser') }
    );

    static displayName = displayName;

    render() {
      return React.createElement(WrappedComponent, { ...this.props });
    }
  }

  return connect(WithCurrentUser.mapStateToProps)(WithCurrentUser);
}
