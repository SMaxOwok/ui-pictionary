import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Team extends PureComponent {
  static propTypes = {
    team: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
    onTeamSelect: PropTypes.func.isRequired
  };

  get playerCount() {
    const count = this.props.team.playerCount;

    return '5 people';
    // if (count === 1) return `${count} person`;
    //
    // return `${count} people`;
  }

  get teamButtonClasses() {
    return classnames('TeamSelect__team__button', {
      'TeamSelect__team__button--selected': this.props.team.id === this.props.selectedId
    })
  }

  handleTeamSelect = () => {
    this.props.onTeamSelect(this.props.team.id);
  };

  render() {
    return (
      <div className='TeamSelect__team'>
        <span className='TeamSelect__team__label'>
          {`Choose ${this.props.team.id}`}
        </span>

        <div className={this.teamButtonClasses} onClick={this.handleTeamSelect}>
          {`${this.props.team.id}`}
        </div>

        <span className='TeamSelect__team__player-count'>
          {this.playerCount}
        </span>
      </div>
    );
  }
}
