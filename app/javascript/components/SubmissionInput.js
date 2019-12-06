import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: This will need palette classes
export default class SubmissionInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string
  };

  static defaultProps = {
    buttonText: 'Submit'
  };

  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value })
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.value) return null;

    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render () {
    return (
      <form className='SubmissionInput' onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Enter a word...'
          value={this.state.value}
          onChange={this.handleChange}
        />

        <button
          type='submit'
          className='SubmissionInput__button Button Button--primary'
        >
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}
