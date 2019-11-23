import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class TeamOption extends PureComponent {
  static propTypes = {
    team: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
    palette: PropTypes.string.isRequired,
    onTeamSelect: PropTypes.func.isRequired
  };

  get teamIsSelected() {
    return this.props.team.id === this.props.selectedId;
  }

  get playerCount() {
    const count = this.props.team.playerCount;

    return '5 people';
    // if (count === 1) return `${count} person`;
    //
    // return `${count} people`;
  }

  get teamButtonClasses() {
    return classnames(`TeamButton TeamButton--${this.props.palette}`, {
      'TeamButton--selected': this.teamIsSelected
    })
  }

  get teamLabel() {
    if (this.teamIsSelected) return `You've selected ${this.props.team.id}`;

    return `Choose ${this.props.team.id}`;
  }

  handleTeamSelect = () => {
    this.props.onTeamSelect(this.props.team.id);
  };

  render() {
    return (
      <div className={`TeamButton TeamButton--${this.props.palette}`}>
        <span className='TeamButton__team__label'>
          {this.teamLabel}
        </span>

        <div className={this.teamButtonClasses} onClick={this.handleTeamSelect}>
          {`${this.props.team.id}`}
        </div>

        <span className='TeamButton__team__player-count'>
          {this.playerCount}
        </span>
      </div>
    );
  }
}
