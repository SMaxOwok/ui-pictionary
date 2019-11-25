import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import Icon from 'components/icons/Icon';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired
  };

  get modalClasses() {
    return classnames('Modal', {
      'Modal--hidden': !this.props.visible
    })
  }

  render() {
    return (
      <div className={this.modalClasses}>
        <div className='Modal__content'>
          <div className='Modal__header'>
            <Icon name='UILogo' className='Modal__ui-logo' />
            UI Pictionary
          </div>

          {this.props.children}
        </div>
      </div>
    )
  }
}
