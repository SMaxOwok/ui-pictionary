import React, { PureComponent } from 'react';

import CurrentUserContext from 'contexts/CurrentUserContext';

export default function withCurrentUser(WrappedComponent) {
  return class extends PureComponent {
    render() {
      return (
        <CurrentUserContext.Consumer>
          {props => (
            <WrappedComponent currentUser={props.currentUser} {...this.props} />
          )}
        </CurrentUserContext.Consumer>
      );
    }
  }
}
