import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default class Gallery extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  state = { selected: null };

  get gallery() {
    return this.props.game.gallery;
  }

  handleSelectImage = (word) => {
    this.setState({ selected: word });
  };

  handleDeselectImage = () => {
    this.setState({ selected: null });
  };

  renderFullSize() {
    const { image } = this.gallery[this.state.selected];

    return (
      <div className='Gallery__full-size'>
        <div className='Gallery__image'>
          <img src={image} />
        </div>
      </div>
    );
  }

  renderThumbnails() {
    return (
      <ul className='Gallery__thumbnails'>
        {Object.keys(this.gallery).map(word => {
          return (
            <li className='Gallery__item' key={word} onClick={() => this.handleSelectImage(word)}>
              <span className='Gallery__title'>{word}</span>

              <div className='Gallery__image'>
                <img src={this.gallery[word].image} />
              </div>
            </li>
          )
        })}
      </ul>
    );
  }

  renderTitle() {
    if (!this.state.selected) return 'Gallery';
    const { artist } = this.gallery[this.state.selected];

    return (
      <div className='Gallery__header'>
        <span className='Gallery__back' onClick={this.handleDeselectImage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>

        {this.state.selected}
        {artist && <span className='Gallery__header__subtitle'>By {artist}</span>}
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <div className='Modal__title'>
          {this.renderTitle()}
        </div>

        <div className='Gallery'>
          {this.state.selected ? this.renderFullSize() : this.renderThumbnails()}
        </div>

        {!this.state.selected && (
          <div className='Modal__actions'>
            <button type='button' className='Modal__button Button Button--primary' onClick={this.props.handleClose}>
              Close
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}
