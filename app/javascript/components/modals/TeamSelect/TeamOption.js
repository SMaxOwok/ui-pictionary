import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TeamIcon from 'components/TeamIcon';

export default class TeamOption extends PureComponent {
  static propTypes = {
    team: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
    onTeamSelect: PropTypes.func.isRequired
  };

  get team() {
    return this.props.team;
  }

  get teamIsSelected() {
    return this.team.id === this.props.selectedId;
  }

  get playerCount() {
    const count = this.team.players.length;
    if (count === 1) return `${count} person`;

    return `${count} people`;
  }

  get teamClasses() {
    return classnames(`TeamSelect__team TeamSelect__team--${this.team.palette}`, {
      'TeamSelect__team--selected': this.teamIsSelected
    })
  }

  get teamLabel() {
    if (this.teamIsSelected) return `You've selected ${this.team.name}`;

    return `Choose ${this.team.name}`;
  }

  handleTeamSelect = () => {
    this.props.onTeamSelect(this.team.id);
  };

  render() {
    return (
      <div className={this.teamClasses}>
        <span className='TeamSelect__team__label'>
          {this.teamLabel}
        </span>

        <div className='TeamSelect__team__button' onClick={this.handleTeamSelect}>
          <TeamIcon team={this.team} />
        </div>

        <span className='TeamSelect__team__player-count'>
          {this.playerCount}
        </span>
      </div>
    );
  }
}
