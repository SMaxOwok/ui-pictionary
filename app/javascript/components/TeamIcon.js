import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icons/Icon';

export default class TeamIcon extends PureComponent {
  static propTypes = {
    team: PropTypes.object.isRequired,
    wrapperClass: PropTypes.string
  };

  static defaultProps = {
    wrapperClass: 'TeamIcon'
  };

  get team() {
    return this.props.team;
  }

  get iconName() {
    return this.team.name.charAt(0).toUpperCase() + this.team.name.slice(1);
  }

  render() {
    return (
      <div className='TeamIcon'>
        <Icon name={this.iconName} className='TeamIcon__icon' />
        <span className='TeamIcon__label'>{`${this.team.name}`}</span>
      </div>
    );
  }
}
